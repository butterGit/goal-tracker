import { Component, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { GoalService } from 'src/app/core/services/goal.service';
import { Goal } from 'src/app/models/goal.model';
import { GoalFormComponent } from '../goal-form/goal-form.component';

@Component({
  selector: 'app-new-goal',
  templateUrl: './new-goal.component.html',
  styleUrls: ['./new-goal.component.scss']
})
export class NewGoalComponent{
  @ViewChild('goalForm') flightForm!: GoalFormComponent;
  goal!: Goal;

  constructor(private goalService: GoalService, private authService: AuthService) {
  }

  addGoal() {
    this.goal = this.flightForm.form.value;
    this.goal.userId = this.authService.userData.uid;
    this.goal.author = this.authService.userData.email;
    //The "g" after the regular expression is an option or flag that performs a global search, looking in the whole string and returning all matches.
    this.goal.startTime = (new Date(this.goal.startTime)).toISOString().slice(0,10).replace(/-/g,"/");
    this.goal.endTime = (new Date(this.goal.endTime)).toISOString().slice(0,10).replace(/-/g,"/");
    this.goalService.addGoal(this.goal);
  }

}
