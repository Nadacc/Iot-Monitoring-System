import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  isSidebarOpen = false;
  isDropdownOpen = false;
  isDarkMode = false;
  firstLetter: string = '';
  userName: string = '';

  constructor(private router: Router, private eRef: ElementRef) {}

  ngOnInit() {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      const user = JSON.parse(loggedInUser);
      if (user && user.userName) {
        this.firstLetter = user.userName.charAt(0).toUpperCase();
        this.userName = user.userName; 
      }
    }

    const savedTheme = localStorage.getItem('theme');
    this.isDarkMode = savedTheme === 'dark';
    this.applyTheme();
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  toggleDropdown(event: Event) {
    event.stopPropagation();
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  goToProfile() {
    this.router.navigate(['/user-details']);
    this.isDropdownOpen = false;
  }

  toggleTheme() {
    this.isDarkMode = !this.isDarkMode;
    localStorage.setItem('theme', this.isDarkMode ? 'dark' : 'light');
    this.applyTheme();
  }

  applyTheme() {
    document.body.classList.toggle('dark-mode', this.isDarkMode);
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
    this.isDropdownOpen = false;
  }

  navigateTo(route: string) {
    this.router.navigate([route]); 
    this.closeSidebar();  
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.querySelector('.profile-container')?.contains(event.target)) {
      this.isDropdownOpen = false;
    }
  }
}