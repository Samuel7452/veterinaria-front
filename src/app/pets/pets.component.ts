import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component,OnInit  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pets',
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})

export class PetsComponent implements OnInit {
  pets: any[] = [];
  admin = false;
  userData: any = undefined;
  showComponent = true;
  isLoading = true;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private authService:AuthService,
    private router: Router

  ) {

  }
  
  ngOnInit(): void {
    this.loadPets()
  }

  loadPets(){
    this.isLoading = true; 
    if (this.userData == undefined) {
      this.userData = this.authService.request(false)
    }
    this.http.get('http://localhost:8000/api/pet', { withCredentials: true })
    .subscribe({
      next: (res: any) => {
        this.pets = res;
        this.admin = this.userData.user_type_id==3;
        this.isLoading = false;

      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });

    

  }

  delete(petId:number): void {
    this.userData = this.authService.request(true)
    .subscribe({
      next: (res: any) => {
        this.userData = res;
        const headers = new HttpHeaders({
          'Authorization': 'Bearer '+ this.userData.token
        });

        this.http.delete(`http://localhost:8000/api/pet/delete/${petId}`, { headers }).subscribe(() => {
          this.loadPets()
        });
 
      },
      error: (err: any) => {
        console.error('Error occurred:', err);
      }
    });

  }

  goToPets() {
    this.router.navigate(['/pet/create']);
  }
  
  goToEditPet(petId:number) {
    this.router.navigate(['/pet/update/',petId]);
  }

  }


