import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { Emitters } from '../../emiters/emiters';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';

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
    private cookieService: CookieService,
    private authService:AuthService
  ) {}

  ngOnInit(): void {



    this.userData = this.authService.request(true)
      .subscribe({
        next: (res: any) => {
          this.userData = res;
          this.message = "Hi " + this.userData.name;
          Emitters.authEmitter.emit(true);
          Emitters.typeEmitter.emit([this.userData.type,this.userData.user_type_id]);
        },
        error: (err: any) => {
          console.error('Error occurred:', err);
          this.message = 'You are not logged in';
          Emitters.authEmitter.emit(false);
          Emitters.typeEmitter.emit([undefined,undefined]);
        }
      });
  }
  
}
