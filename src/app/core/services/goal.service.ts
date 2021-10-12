import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';

import { Goal } from '../../models/goal.model';

import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private goals!: any;

  constructor(private db: AngularFireDatabase) { }

  getGoals(): Observable<Goal[]> {
    return this.db.list<Goal[]>('goals').snapshotChanges().pipe(map((response: any) => response.map((goal: Goal) => this.assignKey(goal))));
  }

  getGoal(id: number): Observable<Goal> {
    return this.db.object<Goal>(`goals/${id}`).snapshotChanges().pipe(map(goal => this.assignKey(goal)));
  }

  addGoal(goal: any) {
    return this.db.list<Goal[]>('goals').push(goal);
  }

  private assignKey(goal: any) {
    return { ...goal.payload.val(), id: goal.key }
  }

  editGoal(id: number, goal: Goal) {
    return this.db.object<Goal>(`goals/${id}`).update(goal);
  }

  removeGoal(id: number) {
    return this.db.object<Goal>(`goals/${id}`).remove();
  }

}
