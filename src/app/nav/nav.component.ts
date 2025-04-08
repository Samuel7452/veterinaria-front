import { Component, EventEmitter, OnInit } from '@angular/core';
// import { HomeComponent } from '../home/home.component';
// import { LoginComponent } from '../login/login.component';
// import { RegisterComponent } from '../register/register.component';
import { RouterModule } from '@angular/router';
import { Emitters } from '../../emiters/emiters';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-nav',
  imports: [RouterModule, CommonModule],
  
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {
  authenticated = false;
  userData: any;
  type: any;
  admin= false;
  vet= false;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private authService:AuthService
    
  ) {

  }

  ngOnInit(): void {

    
    Emitters.authEmitter.subscribe(
      (auth: boolean) => {
        this.authenticated = auth;
      } 
    )
    Emitters.typeEmitter.subscribe(
      (typ: any) => {
        this.type = typ[0];
        this.admin = typ[1]==3;
        this.vet = typ[1]==2;
      } 
    )
    

  }

  logout(): void {
    this.userData = this.authService.request(false)
    if (this.userData.user_type_id == 3) {
      this.admin = true;
      
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '+ this.userData.token
    });

    this.http.post('http://localhost:8000/api/logout', {}, { headers }).subscribe(() => {
      this.authenticated = false;
      this.admin = false;
      this.type = undefined;
      this.cookieService.delete('jwt');
      
    });
  }

}
