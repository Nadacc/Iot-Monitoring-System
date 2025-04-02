import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  
  userLogin: any = {
    emailId:'',
    password: '',
  };

  constructor(private router: Router) {}

  onLogin() {
    const isLocalData = localStorage.getItem("angular18Local");
    if (isLocalData) {
      const users = JSON.parse(isLocalData);
      const isUserFound = users.find((m: any) =>
        m.emailId === this.userLogin.emailId &&
        m.password === this.userLogin.password
      );
      if (isUserFound) {
        localStorage.setItem('loggedInUser', JSON.stringify(isUserFound));
        this.router.navigate(['/dashboard']); 
      } else {
        alert("Email or password is incorrect");
      }
    } else {
      alert("No user found");
    }
  }

  navigateToRegister() {
    this.router.navigate(['/register']);
  }
}
