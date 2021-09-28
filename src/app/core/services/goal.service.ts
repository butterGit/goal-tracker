
import { Injectable} from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';


import { Goal } from '../../models/goal.model';

import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private goals!: any;

  constructor(private db: AngularFireDatabase) { }


  getGoals(): Observable<Goal[]> {
    this.goals = this.db.list('goals');
    return this.goals.valueChanges();
  }

  addGoal(fligth: Goal) {
    this.goals.push(fligth);
  }





}
