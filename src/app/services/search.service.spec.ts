import { TestBed, tick, fakeAsync, async } from '@angular/core/testing';

import { SearchService } from './search.service';
import { TaskService } from './task.service';
import { Task } from '../models/task.models';
import { BehaviorSubject, from } from 'rxjs';
import { delay } from 'rxjs/operators';

const mockTaskService = { orderedTasks$: new BehaviorSubject<Task[]>([]) };

function createTestBed(mockTaskServiceObj?) {
  TestBed.configureTestingModule({
    providers: [
      { provide: TaskService, useValue: mockTaskServiceObj ? mockTaskServiceObj : mockTaskService }
    ]
  });
}

describe('SearchService', () => {
  it('should be created', () => {
    createTestBed();
    const service: SearchService = TestBed.get(SearchService);
    expect(service).toBeTruthy();
  });

  describe('searchResults$ property', () => {
    it('should initially have correct value', () => {
      // arrange
      createTestBed();
      const service: SearchService = TestBed.get(SearchService);
      expect(service.searchResults$.getValue()).toEqual([]);
    });

    it('should have correct value when orderedTasks$ emits a new value', () => {
      // arrange
      const tasks: Task[] = [{ _id: 1, title: '', description: '', completed: true, deleted: false }];
      const otbs = new BehaviorSubject<Task[]>([]);
      createTestBed({ orderedTasks$: otbs });

      // act
      otbs.next(tasks);

      // assert
      const service: SearchService = TestBed.get(SearchService);
      expect(service.searchResults$.getValue()).toEqual(tasks);
    });

    it('should have last emited value when orderedTasks$ emits multiple values', () => {
      // arrange
      const tasks: any = [
        [{ _id: 1, title: 'task1', description: '', completed: true, deleted: false }],
        [
          { _id: 1, title: 'task1', description: '', completed: true, deleted: false },
          { _id: 2, title: 'task2', description: '', completed: true, deleted: false },
          { _id: 3, title: 'task3', description: '', completed: true, deleted: false }
        ],
        [
          { _id: 2, title: 'task2', description: '', completed: true, deleted: false },
          { _id: 3, title: 'task3', description: '', completed: true, deleted: false }
        ]
      ];
      const otbs = new BehaviorSubject<Task[]>([]);
      createTestBed({ orderedTasks$: otbs });

      // act
      tasks.forEach(t => {
        otbs.next(t);
      });

      // assert
      const service: SearchService = TestBed.get(SearchService);
      expect(service.searchResults$.getValue()).toEqual(tasks[tasks.length - 1]);
    });

    it('should have last emited value when orderedTasks$ emits multiple values asyncrhronously', () => {
      // arrange
      const tasks: any = [
        [{ _id: 1, title: 'task1', description: '', completed: true, deleted: false }],
        [
          { _id: 1, title: 'task1', description: '', completed: true, deleted: false },
          { _id: 2, title: 'task2', description: '', completed: true, deleted: false },
          { _id: 3, title: 'task3', description: '', completed: true, deleted: false }
        ],
        [
          { _id: 2, title: 'task2', description: '', completed: true, deleted: false },
          { _id: 3, title: 'task3', description: '', completed: true, deleted: false }
        ]
      ];

      // act
      const otbs = from(tasks).pipe(delay(50));
      createTestBed({ orderedTasks$: otbs });
      const service: SearchService = TestBed.get(SearchService);

      // assert
      otbs.subscribe(
        () => { },
        () => { },
        () => {
          expect(service.searchResults$.getValue()).toEqual(tasks[tasks.length - 1]);
        });
    });

    it('should have last emited value when orderedTasks$ emits multiple values asyncrhronously (fakeAsync)', fakeAsync(() => {
      // arrange
      const tasks: any = [
        [{ _id: 1, title: 'task1b', description: '', completed: true, deleted: false }],
        [
          { _id: 1, title: 'task1b', description: '', completed: true, deleted: false },
          { _id: 2, title: 'task2b', description: '', completed: true, deleted: false },
          { _id: 3, title: 'task3b', description: '', completed: true, deleted: false }
        ],
        [
          { _id: 2, title: 'task2b', description: '', completed: true, deleted: false },
          { _id: 3, title: 'task3b', description: '', completed: true, deleted: false }
        ]
      ];

      // act
      const otbs = from(tasks).pipe(delay(50));
      createTestBed({ orderedTasks$: otbs });
      const service: SearchService = TestBed.get(SearchService);

      // assert
      tick(250);
      expect(service.searchResults$.getValue()).toEqual(tasks[tasks.length - 1]);
    }));
  });
});
