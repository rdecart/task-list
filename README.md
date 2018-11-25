# TaskList

A simple task list / todo web application using Angular 7 created with the Angular CLI.

## Quick Start
Clone this repo or download zip file.  
Run the below from the root of the repo / extracted zip location.  
Install dependencies:
```
npm install
```
Run:
```
npm start
```

Open `http://localhost:4200/` in a web browser.

Note: the above runs the web app in development mode, for convenience this is configured to pre-populate the task list with some sample tasks, in Production mode there is no pre-population.

## Web App Features
* Add tasks - use green button in top right with plus symbol
* Lists tasks in a consistent order
  * Groups tasks in incomplete (yellow), complete (green) and deleted (red) groups
  * Orders tasks in creation order, oldest at top, this applies to each group so that all incomplete tasks will be shown in creation order, followed by all complete tasks in creation order then deleted tasks.
* Mark tasks as completed - click tick button on right of task, can also be used to change a task from completed to incomplete
* Mark tasks as deleted - click trashcan button on right of task
* Restore deleted tasks - with "Show Deleted" ticked, click on refresh button on right of a deleted task to undelete
* Allows completed and deleted tasks to be shown or hidden using checkboxes at top right
* Search: immediately searches and filters visible tasks using any text entered into the search box at top left
  * Click Reset button to clear any entered search text and remove filtering
* Tasks are persisted to the browser's localStorage, this means they will be retained if tab/browser is closed
* Responsive design - layout changes in mobile view vs desktop view

## Dependencies
* Angular
* Angular Cli
* Typescript
* ngx-bootstrap

## Running in Production Mode
The simplest way to run in production mode is to run:  
```
npm run start-prod
```
Then open `http://localhost:4201/` in a web browser.

## Production Build
```
npm run build
```

Serve the `/dist` folder in a web server, see next section for a quick method of doing this for testing.

### Serving Prodcution Build
The contents of the the dist folder simply need to be served as static files by a web server, a quick simple method of doing this is shown below.    

Install http-server globally from npm:  
```
npm install -g http-server
```

Run the below from within the dist folder:
```
http-server
```

Open `http://localhost:8080/` in a web browser.



















# Angular CLI

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
