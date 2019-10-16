import { Component, OnInit } from '@angular/core';
import { TaskService } from '../http/task.service';
import { trigger, state, style, animate, transition, group } from '@angular/animations';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['home.component.css'],
    animations: [
        trigger('enterLeave', [
            transition('void => *', [
                style({
                    opacity: 0.2,
                    transform: 'translateY(100vw)'
                }),
                animate('1000ms ease-in',
                    style({
                        opacity: 1,
                        transform: 'scale(0.5)'
                    })
                )
            ]),

        ]),
    ]
})

export class HomeComponent implements OnInit {
    personalTaskCount;
    teamTaskCount;
    taskList;
    globalTask = false;
    personaTask = false;
    leaderTask = false;
    constructor(private taskService: TaskService) { }

    ngOnInit() {

        this.taskService.getAllTaskCount().subscribe(data => {
            this.personalTaskCount = data.personal;
            this.teamTaskCount = data.team;
        });
        this.taskService.getTaskList().subscribe(data => {
            this.taskList = data.tasks;
        });
    }

}
