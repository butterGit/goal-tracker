import { Component, OnInit } from '@angular/core';
import { GoalService } from '../../services/goal.service';
import { Goal } from '../../models/goal.model';
import { faFacebook, faLinkedin, faGithubSquare } from '@fortawesome/free-brands-svg-icons'


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  facebookIcon = faFacebook;
  linkedinnIcon = faLinkedin;
  githubIcon = faGithubSquare;


  goals! : Array<Goal>;

  constructor(private goalService: GoalService) {
  }

  ngOnInit() {
    this.loadGoals();
  }

  async loadGoals() {
    this.goals = await this.goalService.getGoals();
    console.log(this.goals);
  }



}
