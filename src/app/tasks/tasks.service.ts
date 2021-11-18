import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Task } from './task.model';

@Injectable({providedIn: 'root'})
export class TasksService {
  private tasks: Task[] = [];
  private tasksUpdated = new Subject<Task[]>();

  constructor(private http: HttpClient, private router: Router) {}

  getTasks() {
    this.http
    .get<{message: string, tasks: any}>('http://localhost:3000/tasks')
    .pipe(map((taskData) => {
      return taskData.tasks.map(task => {
        return {
          name: task.name,
          time: task.time,
          id: task._id
        };
      });
    }))
    .subscribe((transformedTasks) => {
      this.tasks = transformedTasks;
      this.tasksUpdated.next([...this.tasks]);
    });
  }

  getTaskUpdateListener() {
    return this.tasksUpdated.asObservable();
  }

  getTask(id: string) {
    return this.http.get<{_id: string, name: string, time: number}>('http://localhost:3000/tasks/' + id);
  }

  addTask(name: string, time: number) {
    const task: Task = {id: null, name: name, time: time};
    this.http
    .post<{message: string, taskId: string}>('http://localhost:3000/tasks', task)
    .subscribe((responseData) => {
      const id = responseData.taskId;
      task.id = id;
      this.tasks.push(task);
      this.tasksUpdated.next([...this.tasks]);
      this.router.navigate(['/']);
    });
  }

  updateTask(id: string, name: string, time: number) {
    const task: Task = { id: id, name: name, time: time };
    this.http.put('http://localhost:3000/tasks/' + id, task)
      .subscribe(response => {
        const updatedTasks = [...this.tasks];
        const oldTaskIndex = updatedTasks.findIndex(t => t.id === task.id);
        updatedTasks[oldTaskIndex] = task;
        this.tasks = updatedTasks;
        this.tasksUpdated.next([...this.tasks]);
        this.router.navigate(['/']);
      });
  }

  deleteTask(taskId: string) {
    this.http.delete('http://localhost:3000/tasks/' + taskId)
    .subscribe(() => {
      const updatedTasks = this.tasks.filter(task => task.id !== taskId);
      this.tasks = updatedTasks;
      this.tasksUpdated.next([...this.tasks]);
    });
  }
}
