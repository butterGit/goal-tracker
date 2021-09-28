import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { GoalCardComponent } from './goal-card/goal-card.component';
import { NewGoalComponent } from './new-goal/new-goal.component';
import { GoalFormComponent } from './goal-form/goal-form.component';
import { NavbarComponent } from './navbar/navbar.component';




@NgModule({
  declarations: [
    GoalCardComponent,
    NewGoalComponent,
    GoalFormComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    GoalCardComponent,
    NewGoalComponent,
    GoalFormComponent,
    NavbarComponent,
  ]
})
export class SharedModule { }
