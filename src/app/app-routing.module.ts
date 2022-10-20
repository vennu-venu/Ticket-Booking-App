import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddMovieComponent } from './components/add-movie/add-movie.component';
import { AdminComponent } from './components/admin/admin.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MaterialTableComponent } from './components/material-table/material-table.component';
import { MovieComponent } from './components/movie/movie.component';
import { MoviesComponent } from './components/movies/movies.component';
import { MyShowsComponent } from './components/my-shows/my-shows.component';
import { RegisterComponent } from './components/register/register.component';
import { ShowsComponent } from './components/shows/shows.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'movies', component: MoviesComponent },
  { path: 'add-movie', component: AddMovieComponent },
  { path: 'movie/:id', component: MovieComponent },
  { path: 'my-shows', component: MyShowsComponent },
  { path: 'shows', component: ShowsComponent },
  { path: 'show-details', component: MaterialTableComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
