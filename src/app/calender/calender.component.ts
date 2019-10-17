import { Component, ViewChild, OnInit } from '@angular/core';
// import CalendarComponent from '@fullcalendar/core/CalendarComponent';
import { OptionsInput } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { CalendarComponent } from 'ng-fullcalendar';
import { TaskService } from '../http/task.service';
@Component({
    selector: 'app-calender',
    templateUrl: './calender.component.html'
})

export class CalenderComponent implements OnInit {
    taskList;
    options: OptionsInput;
    @ViewChild('fullcalendar') fullcalendar: CalendarComponent;

    constructor(private taskService: TaskService) {

    }

    parseDataForCalendar(task) {
        const calEvents = [];
        task.forEach(element => {
            calEvents.push({
                title: element.text,
                start: element.start,
                end: element.end
            });
        });

        this.setCalendarOptions(calEvents);
    }

    setCalendarOptions(eve) {
        this.options = {
            editable: true,
            events: eve,
            customButtons: {
                myCustomButton: {
                    text: 'custom!',
                    click: function () {
                        alert('clicked the custom button!');
                    }
                }
            },
            header: {
                left: ' prev, next today',
                center: 'title',
                right: 'dayGridMonth,timeGridWeek,timeGridDay'
            },
            plugins: [dayGridPlugin, interactionPlugin]
        };
    }

    ngOnInit() {

        this.taskService.getTaskList().subscribe(data => {
            this.parseDataForCalendar(data.tasks);

        });

    }

}
