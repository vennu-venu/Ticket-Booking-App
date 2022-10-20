import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;
  username = "";

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("user")) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem("user") + "";
    }
    if(localStorage.getItem("adminLogin")) {
      this.isAdminLoggedIn = true;
    }
  }

  logout() {
    localStorage.removeItem("user");
    localStorage.removeItem("adminLogin");
    localStorage.removeItem("userId");
    window.location.reload();
  }

}
