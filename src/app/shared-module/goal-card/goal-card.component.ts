import { Component, Input, OnInit } from '@angular/core';
import {faTimes, faHeart as faHeartSolid} from '@fortawesome/free-solid-svg-icons'
import {faHeart} from '@fortawesome/free-regular-svg-icons'
import { GoalService } from 'src/app/core/services/goal.service';

import { Goal } from '../../models/goal.model';
import { AuthService } from 'src/app/core/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-goal-card',
  templateUrl: './goal-card.component.html',
  styleUrls: ['./goal-card.component.scss']
})
export class GoalCardComponent implements OnInit {
  closeIcon = faTimes;
  likeIcon = faHeart;
  @Input() goal!: Goal;
  goalDuration! : number;
  daysLeft! : any;
  spinnerValue: number = 0;
  hideCaption: boolean = false;
  likesNumber : number = 0;

  constructor(private goalService : GoalService,
    private authService: AuthService,
    private toast : MatSnackBar) {}

  ngOnInit(): void {
    if (this.countDaysLeft() <= 0) {
        this.daysLeft = "Goal is completed";
        this.hideCaption = true;
    }
    else{
      this.daysLeft = this.countDaysLeft();
      this.spinnerValue = this.countSpinnerValue();
    }
    this.countLikes();
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

  addLike(e:Event){

    if (this.authService.userData.uid != this.goal.userId)
    {

      if (this.likeIcon == faHeart)
      {
        this.likeIcon = faHeartSolid;
        this.likesNumber++;
        this.goal.likes.push(this.authService.userData.uid);
        this.goalService.editGoal(this.goal.id, this.goal);
      }
      else
      {
        this.likeIcon = faHeart;
        this.likesNumber--;
        const index = this.goal.likes.indexOf(this.authService.userData.uid);
        this.goal.likes.splice(index, 1);
      }
    }
    else
      this.toast.open("You can not like or dislike your own goal");

    e.stopPropagation();
  }

  share(e:Event){
    e.stopPropagation();
  }

  countLikes(){
    if (this.goal.likes === undefined || this.goal.likes.length == 0)
    {
      this.goal.likes = [];
      this.likesNumber = 0;
      this.likeIcon = faHeart;
    }
    else if (this.goal.likes.includes(this.authService.userData.uid)) {
      this.likeIcon = faHeartSolid;
      this.likesNumber = this.goal.likes.length;
    }
    else
    {
      this.likeIcon = faHeart;
      this.likesNumber = this.goal.likes.length;
    }

  }
}
