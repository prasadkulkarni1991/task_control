import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { TaskComponent } from './task/task.component';
import { HomeComponent } from './home/home.component';
import { CalenderComponent } from './calender/calender.component';

export const route: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'task',
        component: TaskComponent
    },
    {
        path: 'calender',
        component: CalenderComponent
    }

];

@NgModule({
    imports: [RouterModule.forRoot(route)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
