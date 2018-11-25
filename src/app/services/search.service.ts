import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TaskService } from './task.service';
import { Task } from '../models/task.models';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private searchTerm: string = null;
  public searchResults: Task[] = [];
  public searchResults$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.searchResults);

  constructor(
    private readonly taskService: TaskService
  ) {
    this.taskService.orderedTasks$.subscribe(t => {
      this.update(t);
    });
  }

  public updateSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.taskService.orderedTasks$.pipe(take(1)).subscribe(t =>
      this.update(t));
  }

  private update(tasks: Task[]) {
    this.searchResults = this.searchTasks(tasks);
    this.searchResults$.next(this.searchResults);
  }

  private searchTasks(tasks: Task[]): Task[] {
    if (typeof this.searchTerm !== 'string' || !this.searchTerm.trim()) {
      return tasks;
    }
    const st = this.searchTerm.trim();

    return tasks.filter(y =>
      y.title.toLowerCase().includes(st) || this.searchDescription(y.description, st));
  }

  private searchDescription(description, searchTerm): boolean {
    if (!description) {
      return false;
    }
    return description.toLowerCase().includes(searchTerm);
  }
}
