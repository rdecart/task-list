import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.models';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent {
  @Input() public tasks: Task[] = [];
  @Input() public showCompleted: boolean;
  @Input() public showDeleted: boolean;
  @Output() stateChange = new EventEmitter<Task>();

  updateState(task: Task) {
    this.stateChange.emit(task);
  }
}
