import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskCreateComponent } from "./tasks/task-create/task-create.component";
import { TaskListComponent } from "./tasks/task-list/task-list.component";

const routes: Routes = [
  { path: '', component: TaskListComponent },
  { path: 'create', component: TaskCreateComponent },
  { path: 'edit/:taskId', component: TaskCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
