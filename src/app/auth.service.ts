import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  response: any;
  req: any;


  constructor(
    private http: HttpClient
  ) { }

  request(bring_request: boolean){
    
    this.req = this.http.get('http://localhost:8000/api/user', { withCredentials: true });
    this.req.subscribe({
      next: (res: any) => {
        console.log(res);
        this.response = res;
      },
      error: (err: any) => {
        console.error('Error occurred:', err);
      }})

    if (bring_request) {
      return this.req;
    } else {
      return this.response;
    }
  }

  



}
