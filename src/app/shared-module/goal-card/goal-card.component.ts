import { Component, Input, OnInit } from '@angular/core';
import {faTimes} from '@fortawesome/free-solid-svg-icons'
import { GoalService } from 'src/app/core/services/goal.service';

import { Goal } from '../../models/goal.model';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss']
})
export class GoalCardComponent implements OnInit {
  closeIcon = faTimes;
  @Input() goal!: Goal;
  goalDuration! : number;
  daysLeft! : any;
  spinnerValue: number = 0;
  hideCaption: boolean = false;

  constructor(private goalService : GoalService) {}

  ngOnInit(): void {
    if (this.countDaysLeft() <= 0) {
        this.daysLeft = "Goal is completed";
        this.hideCaption = true;
    }
    else{
      this.daysLeft = this.countDaysLeft();
      this.spinnerValue = this.countSpinnerValue();
    }

  }

  removeGoal(e:Event){
    e.stopPropagation()
    this.goalService.removeGoal(this.goal.id );
  }

  countSpinnerValue(): number {
    return (this.countDaysLeft() / this.countGoalDuration()) * 100;
  }

  countDaysLeft(): number {
    return Math.ceil((Date.parse(this.goal.endTime) - Date.now()) / (1000 * 60 * 60 * 24));
  }

  countGoalDuration() : number {
   return Math.ceil((Date.parse(this.goal.endTime) - Date.parse(this.goal.startTime)) / (1000 * 60 * 60 * 24));
  }

}
