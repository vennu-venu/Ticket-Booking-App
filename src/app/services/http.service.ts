import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  userBaseUrl: string = "https://6327fac85731f3db996198f4.mockapi.io/users";
  adminBaseUrl: string = "https://6327fac85731f3db996198f4.mockapi.io/admin";
  movieBaseUrl: string = "https://6327fac85731f3db996198f4.mockapi.io/movies";
  showBaseUrl: string = "https://6327fac85731f3db996198f4.mockapi.io/shows";

  constructor(private httpClient: HttpClient) {}

  insertUser(user: any): Observable<any> {
    return this.httpClient.post(this.userBaseUrl, JSON.stringify(user), {
      headers: {"Content-type": "application/json"}
    })
  }

  getUsers(): Observable<any> {
    return this.httpClient.get(this.userBaseUrl);
  }

  getAdmin(): Observable<any> {
    return this.httpClient.get(this.adminBaseUrl);
  }

  getMovies(): Observable<any> {
    return this.httpClient.get(this.movieBaseUrl);
  }

  insertMovie(movie: any): Observable<any> {
    return this.httpClient.post(this.movieBaseUrl, JSON.stringify(movie), {
      headers: {"Content-type": "application/json"}
    })
  }

  insertShow(movie: any, id: string): Observable<any> {
    return this.httpClient.put(this.movieBaseUrl + '/' + id, JSON.stringify(movie), {
      headers: {'Content-type': 'application/json'}
    })
  }

  getMovie(id: string): Observable<any> {
    return this.httpClient.get(this.movieBaseUrl + '/' + id);
  }

  addShow(show: any, id: string): Observable<any> {
    return this.httpClient.put(this.userBaseUrl + '/' + id, JSON.stringify(show), {
      headers: {'Content-type': 'application/json'}
    })
  }

  getShows(): Observable<any> {
    return this.httpClient.get(this.showBaseUrl);
  }

  addShows(show: any): Observable<any> {
    return this.httpClient.post(this.showBaseUrl, JSON.stringify(show), {
      headers: {"Content-type": "application/json"}
    })
  }

  updateBooing(booking: any): Observable<any> {
    return this.httpClient.put(this.showBaseUrl + '/' + booking.id, JSON.stringify(booking), {
      headers: {"Content-type": "application/json"}
    })
  }

}
