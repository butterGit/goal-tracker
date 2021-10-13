import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs/internal/operators/tap';
import { AuthService } from '../core/services/auth.service';
import { GoalService } from '../core/services/goal.service';
import { Goal } from '../models/goal.model';
import { GoalFormComponent } from '../shared-module/goal-form/goal-form.component';

@Component({
  selector: 'app-edit-goal',
  templateUrl: './edit-goal.component.html',
  styleUrls: ['./edit-goal.component.scss'],
})
export class EditGoalComponent implements OnInit {
  @ViewChild('goalForm') goalForm!: GoalFormComponent;
  goal!: Goal;
  id! : string;


  constructor(
    private route: ActivatedRoute,
    private goalService: GoalService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadGoal();
  }

  loadGoal() {
    this.id = this.route.snapshot.params['id'];
    this.goalService.getGoal(this.id).pipe(tap((val) => this.setGoal(val))).subscribe(goal => this.goal = goal);

  }

  setGoal(goal: Goal) {
    const { id, ...formData } = goal;
    this.goalForm.form.patchValue(formData);
    this.goalForm.form.controls['startTime'].setValue(new Date(goal.startTime));
    this.goalForm.form.controls['endTime'].setValue(new Date(goal.endTime));
  }

  editGoal() {
    this.goal = this.goalForm.form.value;
    this.goal.userId = this.authService.userData.uid;
    this.goal.author = this.authService.userData.email;
    //The "g" after the regular expression is an option or flag that performs a global search, looking in the whole string and returning all matches.
    this.goal.startTime = (new Date(this.goal.startTime)).toISOString().slice(0,10).replace(/-/g,"/");
    this.goal.endTime = (new Date(this.goal.endTime)).toISOString().slice(0,10).replace(/-/g,"/");
    this.goalService.editGoal(this.id, this.goal);
    this.router.navigate(['dashboard']);
  }


}
