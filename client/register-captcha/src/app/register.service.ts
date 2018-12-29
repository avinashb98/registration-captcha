import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = 'https://calm-refuge-89560.herokuapp.com/api';

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get(this.baseUrl);
  }

  register(user: any) {
    return this.http.post(this.baseUrl + '/register', user);
  }
}
