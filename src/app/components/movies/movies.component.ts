import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
  isLoggedIn: boolean = false;
  isAdminLoggedIn: boolean = false;

  constructor(private http: HttpService, private router: Router) {}

  movies: any = [];

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.isLoggedIn = true;
    }
    if (localStorage.getItem('adminLogin')) {
      this.isAdminLoggedIn = true;
    }
    this.http.getMovies().subscribe((data) => (this.movies = data));
  }

  buyTickets(id: string) {
    this.router.navigate(['/movie/' + id]);
  }
}
