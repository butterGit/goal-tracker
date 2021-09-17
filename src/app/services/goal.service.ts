
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';


import { Goal } from '../models/goal.model';

@Injectable({
  providedIn: 'root'
})
export class GoalService {

  private goals!: any;

  constructor(private db: AngularFireDatabase) { }

  async getGoals(): Promise<Goal[]> {
    return new Promise((resolve, reject) => {
      this.db.list<Goal[]>('/goals').snapshotChanges().subscribe(data => {
        this.goals = data.map(e => {
          return {
            ...e.payload.val(), id: parseInt(e.key || '404')
          };
        });
        resolve(this.goals);
      });
    });
  }


}
