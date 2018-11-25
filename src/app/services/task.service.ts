import { Injectable } from '@angular/core';
import { Task } from '../models/task.models';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  private tasks: Task[] = [];
  private orderedTasks: Task[] = [];
  public orderedTasks$: BehaviorSubject<Task[]> = new BehaviorSubject<Task[]>(this.orderedTasks);

  constructor() {
    const restored = JSON.parse(localStorage.getItem('task-list-persistence'));
    if (Array.isArray(restored) && restored.length > 0 && restored[0]._id) {
      this.tasks = restored;
    } else if (environment.seed) {
      this.seedTasks();
    }
    this.updateState();
  }


  public addTask(title: string, description: string): boolean {
    const beforeLength = this.tasks.length;
    let nextId = 1;
    if (this.tasks.length > 0) {
      const lastTask = this.tasks[this.tasks.length - 1];
      nextId = lastTask && lastTask._id ? lastTask._id + 1 : 1;
    }
    this.tasks.push({ _id: nextId, title: title, description: description, completed: false, deleted: false });
    this.updateState();
    return beforeLength < this.tasks.length;
  }

  public updateTask(updatedTask: Task): boolean {
    const index = this.tasks.findIndex(x => x._id === updatedTask._id);
    if (index < 0) { return false; }

    this.tasks[index] = updatedTask;
    this.updateState();
    return true;
  }

  public addOrUpdateTask(task: Task): boolean {
    if (this.updateTask(task)) {
      return true;
    }
    return this.addTask(task.title, task.description);
  }

  public deleteTask(id: number): boolean {
    const beforeLength = this.tasks.length;
    this.tasks = this.tasks.filter(x => x._id !== id);
    this.updateState();
    return this.tasks.length < beforeLength;
  }

  private updateState() {
    localStorage.setItem('task-list-persistence', JSON.stringify(this.tasks));
    this.orderTasks();
    this.orderedTasks$.next(this.orderedTasks);
  }

  private orderTasks() {
    // sort so incomplete at the top, then complete, then deleted
    this.orderedTasks = [
      ...this.tasks.filter(x => !x.deleted && !x.completed),
      ...this.tasks.filter(x => !x.deleted && x.completed),
      ...this.tasks.filter(x => x.deleted)];
  }

  private seedTasks(): void {
    if (this.tasks.length === 0) {
      this.tasks = [
        { _id: 1, title: 'Review PR', description: 'Review Dan\'s Angular UI PR', completed: false, deleted: false },
        { _id: 2, title: 'Check Email', description: '', completed: true, deleted: false },
        { _id: 3, title: 'Water Plant', description: 'We don\'t want another dead plant in the office', completed: false, deleted: false },
        { _id: 4, title: 'Order Tea Bags', description: 'PG Tips and Earl Grey', completed: true, deleted: true },
        { _id: 5, title: 'Start nerf fight', description: 'Boss is out Tuesday, maybe then?', completed: false, deleted: false },
      ];
      this.updateState();
    }
  }
}
