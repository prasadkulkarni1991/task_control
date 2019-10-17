import { Component, OnInit } from '@angular/core';
import { TaskService } from './http/task.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  sideNavForm: FormGroup;
  taskRadio;
  homeRadio;
  calenderRadio = false;
  teamTask = 0;
  myTask = 0;
  subscription;

  constructor(private taskService: TaskService,
    private fb: FormBuilder,
    private route: Router) {
    this.taskService.getAllTaskCount().subscribe(count => {
      this.myTask = count.personal;
      this.teamTask = count.team;
    });

  }

  ngOnInit() {

    this.route.events.subscribe(rout => {
      if (rout instanceof NavigationEnd) {
        if (rout.url === '/task') {
          this.taskRadio = true;
        }
        if (rout.url === '/home' || rout.url === '/') {
          this.homeRadio = true;
        }
        if (rout.url === '/calender' || rout.url === '/') {
          this.calenderRadio = true;
        }
      }
    });

    this.setForm();
  }

  setForm() {
    this.sideNavForm = this.fb.group({
      radioValue: ['true'],
      task: [''],
    });
  }
}
