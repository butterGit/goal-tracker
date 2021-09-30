import { Component } from '@angular/core';
import { GoalService } from '../core/services/goal.service';
import { Goal } from '../models/goal.model';
import { MatDialog } from '@angular/material/dialog';
import { NewGoalComponent } from '../shared-module/new-goal/new-goal.component';
import { Observable } from 'rxjs/internal/Observable';
import { Router } from '@angular/router';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.scss'],
})
export class GoalComponent {
  goals: Observable<Goal[]> = this.goalService.getGoals();

  constructor(
    private goalService: GoalService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  openGoalForm() {
    this.dialog.open(NewGoalComponent);
  }

  goToEditFlights(goal: Goal) {
    this.router.navigate(['/dashboard', goal.id]);
  }
}
