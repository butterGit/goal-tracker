import { Component, OnInit } from '@angular/core';
import { GoalService } from '../core/services/goal.service';
import { Goal } from '../models/goal.model';
import { MatDialog } from '@angular/material/dialog';
import {
  faFacebook,
  faLinkedin,
  faGithubSquare,
} from '@fortawesome/free-brands-svg-icons';
import { NewGoalComponent } from '../shared-module/new-goal/new-goal.component';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent {
  facebookIcon = faFacebook;
  linkedinnIcon = faLinkedin;
  githubIcon = faGithubSquare;

  goals: Observable<Goal[]> = this.goalService.getGoals();

  constructor(private goalService: GoalService, private dialog: MatDialog) {}

  openGoalForm() {
    this.dialog.open(NewGoalComponent);
  }
}
