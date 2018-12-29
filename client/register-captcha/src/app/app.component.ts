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
    password: ''
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
            } else {
              alert(data.message);
            }
          },
          errorResp => {
            if (errorResp.error.message === 'Please include Captcha Code in your request') {
              this.safe = false;
            }
          }
        );
    } else {
      alert('Inputs not valid. Please check again');
    }
  }

  validName(name) {
    return (
      typeof name === 'string'
      && name.length >= 3
      && name.length <= 30
    );
  }
  validPassword(password) {
    const regularExpression = /^[a-zA-Z0-9]{3,30}$/;
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
