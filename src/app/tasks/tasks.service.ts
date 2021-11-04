import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

import { Task } from './task.model';

@Injectable({providedIn: 'root'})
export class TasksService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient) {}

  getTasks() {
    this.http.get<{message: string, tasks: Task[]}>('http://localhost:3000/tasks').subscribe((taskData) => {
      this.tasks = taskData.tasks;
      this.tasksUpdated.next([...this.tasks]);
    });
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  addTask(name: string, time: number) {
    const task: Task = {id: null, name: name, time: time};
    this.http.post<{message: string}>('http://localhost:3000/tasks', task).subscribe((responseData) => {
      console.log(responseData.message);
      this.tasks.push(task);
      this.tasksUpdated.next([...this.tasks]);
    });
  }
}
