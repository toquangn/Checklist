import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { TodosComponent } from './todos/todos.component';

import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    component: TodosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
