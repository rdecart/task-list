import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { TaskListComponent } from './components/task-list/task-list.component';
import { SearchComponent } from './components/search/search.component';
import { TaskService } from './services/task.service';
import { SearchService } from './services/search.service';


@NgModule({
  declarations: [
    AppComponent,
    TaskCardComponent,
    TaskListComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    TaskService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
