import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  invalidCred: boolean = false;

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("user") || localStorage.getItem("adminLogin")) {
      this.router.navigate(['/home']);
    }
  }

  onSubmit() {
    let username:string = this.userForm.controls.username.value + "";
    let password:string = this.userForm.controls.password.value + "";
    this.http.getUsers().subscribe(users => {
      users = users.filter((user: any) => user.username === username && user.password === password);
      if(users.length === 0) {
        this.invalidCred = true;
      }
      else {
        localStorage.setItem("user", username);
        localStorage.setItem("userId",users[0].id);
        window.location.reload();
      }
    })
  }

}
