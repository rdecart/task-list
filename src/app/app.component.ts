import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { TaskService } from './services/task.service';
import { Task } from './models/task.models';
import { SearchService } from './services/search.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public newTaskOpen = false;
  public tasks: Observable<Task[]>;
  public showCompleted = true;
  public showDeleted = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly taskService: TaskService,
    private readonly searchService: SearchService
  ) {
    this.tasks = this.searchService.searchResults$;
  }

  public newTaskForm = this.fb.group({
    title: ['', Validators.required],
    description: ['']
  });

  public closeNewTaskPanel() {
    this.newTaskOpen = false;
  }

  public openNewTaskPanel() {
    this.newTaskOpen = true;
  }

  public createTask() {
    if (this.taskService.addTask(this.newTaskForm.value.title, this.newTaskForm.value.description)) {
      this.closeNewTaskPanel();
      this.newTaskForm.reset();
    }
  }

  public updateState(task: Task) {
    this.taskService.updateTask(task);
  }

  public searchTermChange(searchTerm: string) {
    this.searchService.updateSearchTerm(searchTerm);
  }

  public showCompletedChange(showCompleted: boolean) {
    this.showCompleted = showCompleted;
  }

  public showDeletedChange(showDeleted: boolean) {
    this.showDeleted = showDeleted;
  }
}
