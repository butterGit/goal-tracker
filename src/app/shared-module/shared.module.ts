import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../material/material.module';
import { GoalCardComponent } from './goal-card/goal-card.component';



@NgModule({
  declarations: [
    DashboardComponent,
    GoalCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FormsModule,
  ]
})
export class SharedModule { }
