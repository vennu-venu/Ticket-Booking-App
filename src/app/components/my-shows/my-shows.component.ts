import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-my-shows',
  templateUrl: './my-shows.component.html',
  styleUrls: ['./my-shows.component.css']
})
export class MyShowsComponent implements OnInit {

  myShows: any = [];

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("user") === null) {
      this.router.navigate(['login']);
    }
    this.http.getShows().subscribe(data => {
      this.myShows = data.filter((show: any) => show.username === localStorage.getItem("user"));
    })
  }

}
