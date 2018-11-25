import { TestBed, async, fakeAsync, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SearchService } from './services/search.service';
import { TaskService } from './services/task.service';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { SearchComponent } from './components/search/search.component';
import { delay } from 'rxjs/operators';

const mockFormBuilder = { group: () => { } };
const mockTaskService = {};
const mockSearchService = { searchResults$: of([1, 2, 3]) };

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        TaskListComponent,
        TaskCardComponent,
        SearchComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: TaskService, useValue: mockTaskService },
        { provide: SearchService, useValue: mockSearchService }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    // arrange
    // act
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;

    // assert
    expect(app).toBeTruthy();
  });
});
