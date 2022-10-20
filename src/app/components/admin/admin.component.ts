import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  invalidCred: boolean = false;

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  })

  constructor(private http: HttpService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("user") || localStorage.getItem("adminLogin")) {
      this.router.navigate(['/movies']);
    }
  }

  onSubmit() {
    this.http.getAdmin().subscribe(data => {
      if(data[0].username === this.userForm.value.username && data[0].password === this.userForm.value.password) {
        window.localStorage.setItem("adminLogin", "true");
        window.location.reload();
      }
      else {
        this.invalidCred = true;
      }
    });
  }

}
