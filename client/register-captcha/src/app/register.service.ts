import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private baseUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) { }

  index() {
    return this.http.get(this.baseUrl);
  }

  register(user: any) {
    return this.http.post(this.baseUrl + '/register', user);
  }
}
