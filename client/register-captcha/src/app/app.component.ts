import { Component } from '@angular/core';
import { RegisterService } from './register.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  safe = true;
  user = {
    name: '',
    email: '',
    password: '',
    captchaCode: ''
  };

  constructor(private registerService: RegisterService) { }

  register() {
    if (this.validUser()) {
      this.registerService
        .register(this.user)
        .subscribe(
          (data: any) => {
            if (data.message === 'User successfully registered') {
              alert('User Successfully registered');
              this.user.name = '';
              this.user.email = '';
              this.user.password = '';
              this.safe = true;
            }
          },
          errorResp => {
            console.log(errorResp);
            if (errorResp.error.message === 'Please include Captcha Code in your request') {
              this.safe = false;
            }
            if (errorResp.error.message === 'User with this email already exists') {
              alert('Email Already Exists');
            }
          }
        );
    } else {
      alert('Inputs not valid. Please check again');
    }
  }
  resolved(captchaResponse: string) {
    this.user.captchaCode = captchaResponse;
  }

  validName(name) {
    return (
      typeof name === 'string'
      && name.length >= 3
      && name.length <= 30
    );
  }
  validPassword(password) {
    const regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
    return regularExpression.test(password);
  }
  validEmail(email) {
    const regex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/;
    return regex.test(email);
  }
  validUser() {
    return (
      this.validEmail(this.user.email)
      && this.validName(this.user.name)
      && this.validPassword(this.user.password)
    );
  }
}
