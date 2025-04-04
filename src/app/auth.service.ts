import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  response: any;
  req: any;


  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  request(bring_request: boolean){
    
    this.req = this.http.get('http://localhost:8000/api/user', { withCredentials: true });
    this.req.subscribe({
      next: (res: any) => {
        this.response = res;
      },
      error: (err: any) => {
        // this.router.navigate(['/']);
        console.error('Error occurred:', err);
      }})

    if (bring_request) {
      return this.req;
    } else {
      return this.response;
    }
  }

  



}
