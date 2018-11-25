import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  public searchTerm = '';
  @Input() public showCompleted;
  @Input() public showDeleted;
  @Output() public showCompletedChange = new EventEmitter<boolean>();
  @Output() public showDeletedChange = new EventEmitter<boolean>();
  @Output() public searchTermChange = new EventEmitter<string>();

  toggleShowCompleted() {
    this.showCompleted = !this.showCompleted;
    this.showCompletedChange.emit(this.showCompleted);
  }

  toggleShowDeleted() {
    this.showDeleted = !this.showDeleted;
    this.showDeletedChange.emit(this.showDeleted);
  }

  searchUpdate() {
    this.searchTermChange.emit(this.searchTerm);
  }

  resetSearch() {
    this.searchTerm = '';
    this.searchUpdate();
  }
}
