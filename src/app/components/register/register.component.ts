import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  userForm = new FormGroup({
    username: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    cpassword: new FormControl('', Validators.required)
  })

  constructor(private httpService: HttpService, private router: Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("user") || localStorage.getItem("adminLogin")) {
      this.router.navigate(['/home']);
    }
  }


  onSubmit() {
    if(this.userForm.controls.password.value !== this.userForm.controls.cpassword.value) {
      alert("Confirm Password should be matched with Password");
      return;
    }
    let user = { ...this.userForm.value };
    delete user.cpassword;
    this.httpService.insertUser(user).subscribe(data => {
      console.log(data);
      this.router.navigate(['/login']);
    });
  }

}

