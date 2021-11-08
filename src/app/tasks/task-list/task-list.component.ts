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
      return Math.floor(mins/60) + ' hours ago';
    }
    else if (mins < 10080) {
      return Math.floor(mins/1440) + ' days ago';
    }
    else if (mins < 43800) {
      return Math.floor(mins/10080) + ' weeks ago';
    }
    else if (mins < 525600) {
      return Math.floor(mins/43800) + ' months ago';
    }
    else {
      return Math.floor(mins/525600) + ' years ago';
    }
  }

  tasks: Task[] = [];
  private tasksSub: Subscription;

  constructor(public tasksService: TasksService) {}

  ngOnInit() {
    this.tasksService.getTasks();
    this.tasksSub = this.tasksService.getTaskUpdateListener().subscribe((tasks: Task[]) => {
      this.tasks = tasks;
    });
  }

  onDelete(taskId: string) {
    this.tasksService.deleteTask(taskId);
  }

  ngOnDestroy() {
    this.tasksSub.unsubscribe();
  }
}
