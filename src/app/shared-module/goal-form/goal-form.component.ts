import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss']
})
export class GoalFormComponent implements OnInit {
  form!: FormGroup;
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.buildForm();
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      goalName: ['' , {validators: [Validators.required]}],
      startTime : [Date.now(), {validators: [Validators.required]}],
      endTime : ['' , {validators: [Validators.required]}],
      privacy : ['public' , {validators: [Validators.required]}],
      additionalInformation : ['' , {validators: [Validators.required]}],
    })
  }

}
