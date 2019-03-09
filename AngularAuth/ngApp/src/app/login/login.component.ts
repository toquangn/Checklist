import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginUserData = {}

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
  }

  loginUser(){
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        res => {
          console.log('res: ', res);
          localStorage.setItem('token', res.token);
          this._router.navigate(['/events']); 
        },
        err => console.log('err: ', err)
      );
  }

}
