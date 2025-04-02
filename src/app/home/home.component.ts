import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Emitters } from '../../emiters/emiters';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-home',
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  message = 'You are not logged in';
  userData: any;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {}

  ngOnInit(): void {



    this.http.get('http://localhost:8000/api/user', { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          console.log(res);
          this.userData = res;
          this.message = "Hi " + this.userData.name;
          Emitters.authEmitter.emit(true);
        },
        error: (err) => {
          console.error('Error occurred:', err);
          this.message = 'You are not logged in';
          Emitters.authEmitter.emit(false);
        }
      });
  }
  
}
