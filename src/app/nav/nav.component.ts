import { Component, EventEmitter, OnInit } from '@angular/core';
// import { HomeComponent } from '../home/home.component';
// import { LoginComponent } from '../login/login.component';
// import { RegisterComponent } from '../register/register.component';
import { RouterModule } from '@angular/router';
import { Emitters } from '../../emiters/emiters';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, CommonModule],
  
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  authenticated = false;
  userData: any;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {

  }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        console.log(auth)

        this.authenticated = auth;
      } 
    )

    

  }

  logout(): void {
    // this.authenticated = false;



    this.http.get('http://localhost:8000/api/user', { withCredentials: true })
    .subscribe({
      next: (res: any) => {
        console.log(res);
        this.userData = res;

        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer '+ this.userData.token
        });

        console.log(headers)
        this.http.post('http://127.0.0.1:8000/api/logout', {}, { headers }).subscribe(() => {
          this.authenticated = false;
          this.cookieService.delete('jwt');
          
        });
 
      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });

  }

}
