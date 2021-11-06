import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent{


  user =  {
    email: '',
    password: '',
  }

  constructor(private authService: AuthService,
    private router: Router,
    private toast : MatSnackBar,) { }

  login() {
    this.authService.login(this.user).then(() => this.router.navigate(['/dashboard']))
    .catch(err => this.toast.open(err.message));
  }

  register() {
    this.authService.register(this.user).then(() => this.toast.open("Account succeesfully registered. Please login"))
    .catch(err => this.toast.open(err.message));
  }


}
