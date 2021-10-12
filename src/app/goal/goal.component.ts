import { Component, OnInit } from '@angular/core';
import { GoalService } from '../core/services/goal.service';
import { Goal } from '../models/goal.model';
import { MatDialog } from '@angular/material/dialog';
import { NewGoalComponent } from '../shared-module/new-goal/new-goal.component';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';
import { map } from "rxjs/operators";


@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'],
})
export class GoalComponent {
  yourGoals!: Observable<Goal[]>;
  publicGoals!: Observable<Goal[]>;
  id!: string;


  constructor(
    private goalService: GoalService,
    private dialog: MatDialog,
    private router: Router,
    private authService: AuthService
  ) {
    this.id = this.authService.userData.uid;
    this.groupGoals();
  }

  openGoalForm() {
    this.dialog.open(NewGoalComponent);
  }

  goToEditFlights(goal: Goal) {
    this.router.navigate(['/dashboard', goal.id]);
  }

  groupGoals() {
    this.yourGoals = this.goalService.getGoals().pipe(map(goals => goals.filter(goal => goal.userId == this.id)));
    this.publicGoals = this.goalService.getGoals().pipe(map(goals => goals.filter(goal => goal.userId != this.id && goal.privacy == 'public')));
  }
}
