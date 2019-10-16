import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TaskService } from '../http/task.service';
import { MessageService } from 'primeng/components/common/messageservice';
import { trigger, state, style, animate, transition, group } from '@angular/animations';
declare var $: any;

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    styleUrls: ['task.component.css'],
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



export class TaskComponent implements OnInit {
    personalTaskCount;
    teamTaskCount;
    @Output() messageEvent = new EventEmitter();
    taskList;
    tasksList;
    assending = true;
    desending = true;
    taskDisabled = false;
    filterRadioBox = [];
    filterSelectedFromCheckboxes = [];
    constructor(private taskService: TaskService,
        private messageService: MessageService) {

    }

    initRadio() {
        this.filterRadioBox = [
            { 'name': 'isPersonal', 'value': 'all', 'label': 'All Task' },
            { 'name': 'isPersonal', 'value': 'personal', 'label': 'Personal Task' },
            { 'name': 'leader', 'value': 'leader', 'label': 'Leader Task' },
            { 'name': 'other', 'value': 'other', 'label': 'Other Task' }
        ];
    }


    ngOnInit() {
        const prasad = this.taskService.getTaskCount();
        this.initRadio();
        this.taskService.getAllTaskCount().subscribe(data => {
            this.personalTaskCount = data.personal;
            this.teamTaskCount = data.team;
        });

        this.taskService.getTaskList().subscribe(data => {
            this.taskList = data.tasks;
            this.tasksList = data.tasks;
        });
    }


    confirmAdd(event) {
        const taskCountObj = {
            personal: this.personalTaskCount + 1,
            team: this.teamTaskCount
        };
        event.creator = 'Own';
        event.isGlobal = false;
        event.isLeader = false;
        this.taskList.unshift(event);
        this.taskService.updateTaskCount(taskCountObj);
        this.messageService.add({ severity: 'success', summary: 'Task Added successfully' });
    }

    saveTask(classId): void {
        this.messageEvent.emit(classId);
        this.hideModal();
    }

    hideModal(): void {
        document.getElementById('close-modal').click();
    }

    applyFilter(filterFor, event) {
        const filtertype = filterFor;
        this.taskList = [];
        this.tasksList.filter(data => {
            if (filtertype === 'personal' && !data.isLeader && !data.isGlobal) {
                this.taskList.push(data);
            }
            if (filtertype === 'leader' && data.isLeader) {
                this.taskList.push(data);
            }
            if (filtertype === 'other' && (data.isLeader || data.isGlobal)) {
                this.taskList.push(data);
            }
            if (filtertype === 'all') {
                this.taskList = this.tasksList;
            }
        });
    }

    sortData(order, type) {
        if (order === 'assending') {
            if (!this.assending) {
                this.assending = !this.assending;
                this.desending = !this.desending;
            } else {

            }
            this.taskList.sort((a, b) => {
                if (a[type] < b[type]) {
                    return -1;
                } else if (a[type] > b.type) {
                    return 1;
                } else {
                    return 0;
                }
            });
            return this.taskList;
        } else {
            if (this.desending) {
                this.assending = !this.assending;
                this.desending = this.desending;
            } else {
                this.assending = !this.assending;
                this.desending = !this.desending;
            }

            this.taskList.sort((a, b) => {
                if (a[type] > b[type]) {
                    return -1;
                } else if (a[type] < b[type]) {
                    return 1;
                } else {
                    return 0;
                }
            });
            return this.taskList;
        }
    }


    taskCompleted(task, event) {
        this.taskList[event].isCompleted = true;
        if (!task.isGlobal && !task.isLeader) {
            this.personalTaskCount = this.personalTaskCount - 1;
        } else {
            this.teamTaskCount = this.teamTaskCount - 1;
        }
        const taskObj = { personal: this.personalTaskCount, team: this.teamTaskCount };
        this.taskService.updateTaskCount(taskObj);
        this.taskDisabled = true;
    }
}
