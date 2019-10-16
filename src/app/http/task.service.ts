import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
@Injectable()
export class TaskService {
    allCount;
    personalTask = new Subject<any>();
    teamTask = new Subject<any>();
    taskCount = new Subject<any>();
    teamTaskCount;
    myTaskCount;
    constructor(private http: HttpClient) {

    }

    getTaskList(): Observable<any> {
        this.getTaskCount();
        return this.http.get('./assets/task.json');
    }

    getTaskCount() {
        this.http.get('./assets/task.json').subscribe(data => {
            this.parseTask(data);
        });
    }

    parseTask(task) {
        this.teamTaskCount = 0;
        this.myTaskCount = 0;
        task.tasks.forEach(element => {
            if (element.isLeader || element.isGlobal) {
                this.teamTaskCount = this.teamTaskCount + 1;
            }
            if (!element.isLeader && !element.isGlobal) {
                this.myTaskCount = this.myTaskCount + 1;
            }
        });

        const taskObj = { personal: this.myTaskCount, team: this.teamTaskCount };
        this.updateTaskCount(taskObj);

    }

    updateTaskCount(taskCount) {
        this.taskCount.next({ personal: taskCount.personal, team: taskCount.team });
    }

    getAllTaskCount(): Observable<any> {
        return this.taskCount.asObservable();
    }
}

