import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-shows',
  templateUrl: './shows.component.html',
  styleUrls: ['./shows.component.css']
})
export class ShowsComponent implements OnInit {

  shows: any = [];

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("adminLogin") === null) {
      this.router.navigate(['/admin']);
    }
    this.http.getShows().subscribe(data => this.shows = data);
  }

}
