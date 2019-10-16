import {
    Component, OnInit, Output, EventEmitter
} from '@angular/core';
import { Validators, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TaskService } from 'src/app/http/task.service';
declare var $: any;
@Component({
    selector: 'app-add-task',
    templateUrl: './addTask.component.html',
    styleUrls: ['addTask.component.css']
})

export class AddTaskComponent implements OnInit {
    @Output() messageEvent = new EventEmitter();
    taskForm: FormGroup;
    text: FormControl;
    start: FormControl;
    end: FormControl;

    divStyle;

    constructor(
        private fb: FormBuilder,
        private taskService: TaskService,
    ) {
    }

    ngOnInit() {
        this.setSectionForm();

    }
    setSectionForm() {
        this.taskForm = this.fb.group({
            text: ['', Validators.required],
            start: ['', Validators.required],
            end: ['', Validators.required],
        });
    }


    saveTask(form) {
        const taskDetails = {
            text: form.controls['text'].value,
            start: form.controls['start'].value,
            end: form.controls['end'].value,
        };

        this.messageEvent.emit(taskDetails);
        this.hideModal();
    }

    openModal() {
        $('#myModal').modal('show');
    }

    hideModal() {
        $('#myModal').modal('hide');
        $('#myModal input').val('');
    }
}
