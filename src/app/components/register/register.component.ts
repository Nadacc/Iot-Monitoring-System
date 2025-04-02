import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports:[FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  userRegisterObj: any = {
    emailId: '',
    userName: '',
    password: ''
  };

  constructor(private router: Router) {}

  onRegister() {
    const isLocalData = localStorage.getItem("angular18Local");
    if (isLocalData) {
      const localArray = JSON.parse(isLocalData);
      localArray.push(this.userRegisterObj);
      localStorage.setItem("angular18Local", JSON.stringify(localArray));
    } else {
      const localArray = [this.userRegisterObj];
      localStorage.setItem("angular18Local", JSON.stringify(localArray));
    }
    alert("Registration Successful!");
    this.router.navigate(['/login']); 
  }

  navigateToLogin() {
    this.router.navigate(['/login']); 
  }
}
