import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-add-movie',
  templateUrl: './add-movie.component.html',
  styleUrls: ['./add-movie.component.css']
})
export class AddMovieComponent implements OnInit {

  movieForm = new FormGroup({
    name: new FormControl('', Validators.required),
    posterLink: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    show: new FormControl('morning', Validators.required),
    theatre: new FormControl('pvr', Validators.required),
    capacity: new FormControl(100, Validators.required)
  })


  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("adminLogin") === null) {
      this.router.navigate(['login']);
    }
  }

  onSubmit() {
    let movie = {
      name: this.movieForm.value.name,
      posterLink: this.movieForm.value.posterLink,
      shows: [
        {
          date: this.movieForm.value.date,
          show: this.movieForm.value.show,
          theatre: this.movieForm.value.theatre,
          capacity: this.movieForm.value.capacity
        }
      ]
    }
    this.http.getMovies().subscribe(data => {
      let res = data.filter((item: any) => item.name === movie.name);
      if(res.length === 0) {
        this.http.insertMovie(movie).subscribe(data => console.log(data));
      }
      else {
        movie.shows = [...movie.shows, ...res[0].shows];
        this.http.insertShow(movie, res[0].id).subscribe(data => {
          this.router.navigate(['/movies']);
        });
      }
    })
  }

}
