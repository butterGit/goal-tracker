import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthGuard,  redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { HomeComponent } from './home/home.component';
import { EditGoalComponent } from './edit-goal/edit-goal.component';
import { GoalComponent } from './goal/goal.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectUnauthorizedToLogin},
  children: [
    { path: '', component: GoalComponent},
    { path: ':id', component: EditGoalComponent}
  ]
  },
  {path: '**', redirectTo: '404' },
  {path: '404', component: PageNotFoundComponent, pathMatch: 'full'},

]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
