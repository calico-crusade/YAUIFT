import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { TodoComponent } from './todo/todo.component';
import { TodosComponent } from './todos/todos.component';

const routes: Routes = [
    {
        path: 'todos',
        children: [
            {
                path: '',
                pathMatch: 'full',
                component: TodosComponent
            }, 
            {
                path: ':id',
                component: TodoComponent
            }
        ]
    },
    {
        path: 'about',
        component: AboutComponent
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/todos'
    },
    {
        path: '**',
        redirectTo: '/todos'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
