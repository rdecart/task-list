import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Task } from 'src/app/models/task.models';

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.css']
})
export class TaskCardComponent {

  @Input() public task: Task;
  @Input() public showDeleted = false;
  @Input() public showCompleted = false;
  @Output() stateChange = new EventEmitter<Task>();

  public get cardClasses(): string {
    if (this.task.deleted) {
      return 'alert alert-danger';
    }
    return `alert ${this.task.completed ? 'alert-success' : 'alert-warning'}`;
  }

  public get showCard(): boolean {
    return this.task && (!this.task.deleted || this.showDeleted) && (!this.task.completed || this.showCompleted);
  }

  public changeCompleteState() {
    this.task.completed = !this.task.completed;
    this.stateChange.emit(this.task);
  }

  public changeDeleteState() {
    this.task.deleted = !this.task.deleted;
    this.stateChange.emit(this.task);
  }
}
