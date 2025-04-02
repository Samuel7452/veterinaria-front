import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component,OnInit  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-pets',
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})

export class PetsComponent implements OnInit {
    pets: any[] = [];
    // rol: any;
    userData: any;
    constructor(
      private http: HttpClient,
      private cookieService: CookieService
      // private cookieService: CookieService
    ) {
  
    }
  
    ngOnInit(): void {


      this.http.get('http://localhost:8000/api/user', { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.userData = res;
        },
        error: (err) => {
          console.error('Error occurred:', err);
        }})

    this.http.get('http://localhost:8000/api/pet', { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.pets = res;

          // this.rol = this.cookieService.get('user-rol')!=3;
          // console.log('Cookie Value:', userRol);
          // this.userData = res;
          // this.message = "Hi " + this.userData.name;
          // Emitters.authEmitter.emit(true);
        },
        error: (err) => {
          console.error('Error occurred:', err);
          // this.message = 'You are not logged in';
          // Emitters.authEmitter.emit(false);
        }
      });
    }
  
  }


