import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subscription } from 'rxjs';

import { Task } from '../task.model';
import { TasksService } from "../tasks.service";

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit, OnDestroy {
  elapsedTime (t: number) {
    const mins = Math.floor((Date.now()-t)/60000);
    if (mins == 0) {
      return 'less than a minute ago';
    }
    else if (mins < 60) {
      return mins + ' minutes ago';
    }
    else if (mins < 1440) {
      return mins/60 + ' hours ago';
    }
    else if (mins < 10080) {
      return mins/1440 + ' days ago';
    }
    else if (mins < 43800) {
      return mins/10080 + ' weeks ago';
    }
    else if (mins < 525600) {
      return mins/43800 + ' months ago';
    }
    else {
      return mins/525600 + ' years ago';
    }
  }

  tasks: Task[] = [];
  private tasksSub: Subscription;

  constructor(public tasksService: TasksService) {}

  ngOnInit() {
    /*this.tasks = [
      {name: "buy eggs", time: Date.now()-1800000},
      {name: "buy bacon", time: Date.now()-36000000},
      {name: "buy bread", time: Date.now()-345600000},
      {name: "buy milk", time: Date.now()-1209600000},
      {name: "buy orange juice", time: Date.now()-18396000000},
      {name: "buy Apple stock", time: Date.now()-1261440000000}
    ];*/
    this.tasks = this.tasksService.getTasks();
    this.tasksSub = this.tasksService.getTaskUpdateListener().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }
}
