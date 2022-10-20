import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;
  username: string = "";

  constructor() { }

  ngOnInit(): void {
    if(localStorage.getItem("user")) {
      this.isLoggedIn = true;
      this.username = localStorage.getItem("user") + "";
    }
  }

}
