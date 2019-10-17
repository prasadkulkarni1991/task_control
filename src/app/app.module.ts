import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { TaskComponent } from './task/task.component';
import { AppRoutingModule } from './app.routing.module';
import { TaskService } from './http/task.service';
import { AddTaskComponent } from './task/new-task/addTask.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {MessagesModule} from 'primeng/messages';
import { MessageService } from 'primeng/components/common/messageservice';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { FullCalendarModule } from 'ng-fullcalendar';
import { CalenderComponent } from './calender/calender.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TaskComponent,
    AddTaskComponent,
    CalenderComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MessagesModule,
    ToastModule,
    BrowserAnimationsModule,
    ButtonModule,
    FullCalendarModule
  ],
  providers: [TaskService,
    MessageService],
  bootstrap: [AppComponent],
  entryComponents: [
    AddTaskComponent
  ]
})
export class AppModule { }
