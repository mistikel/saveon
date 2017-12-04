import { LoginService } from './../service/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  credential = {
    username : '',
    password : ''
  };
  constructor(private loginService: LoginService) { }

  ngOnInit() {
  }

  login() {
   this.loginService.login(this.credential.username, this.credential.password)
      .subscribe( result => {
        console.log(result);
      }
   );
  }

  signInWithTwitter(){
    this.loginService.signInWithTwitter();
  }

}
