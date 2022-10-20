import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})
export class MovieComponent implements OnInit {

  id: string = "";
  movieData: any = null;

  constructor(private activatedRoute: ActivatedRoute, private http: HttpService, private router: Router) { }

  ngOnInit(): void {

    if(localStorage.getItem("user") === null) {
      this.router.navigate(['login']);
    }

    this.id = this.activatedRoute.snapshot.paramMap.get('id') + "";
    this.http.getMovie(this.id).subscribe(data => this.movieData = data);
  }

  ticketForm = new FormGroup({
    quantity: new FormControl(0, Validators.required)
  })

  buyTickets(ind: number) {
    if(this.movieData.shows[ind].capacity < parseInt(this.ticketForm.value.quantity + "")) {
      alert(this.ticketForm.value.quantity + " seats are not avaialable");
      return;
    }
    this.movieData.shows[ind].capacity -= parseInt(this.ticketForm.value.quantity + "");

    this.http.insertShow(this.movieData, this.id).subscribe(data => {
      let showData = {
        username: localStorage.getItem("user"),
        name: data.name,
        posterLink: data.posterLink,
        ...data.shows[ind],
        tickets: this.ticketForm.value.quantity
      }
      this.http.addShows(showData).subscribe(res => console.log(res));
      alert("Successfully! Tickets were booked !!")
    });
  }

}
