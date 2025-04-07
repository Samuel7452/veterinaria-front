import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component,OnInit  } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
// import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CreateMedicalHistoryComponent } from '../create-medical-history/create-medical-history.component';
import { Emitters } from '../../emiters/emiters';
import { UpdateMedicalHistoryComponent } from '../update-medical-history/update-medical-history.component';
// import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-pets',
  imports: [ReactiveFormsModule, HttpClientModule, CommonModule, CreateMedicalHistoryComponent, UpdateMedicalHistoryComponent],
  templateUrl: './pets.component.html',
  styleUrl: './pets.component.css'
})

export class PetsComponent implements OnInit {
  pets: any[] = [];
  histories: any[] = [];
  admin = false;
  vet = false;
  userData: any = undefined;
  showComponent = true;
  isLoading = true;
  showOverlay = false;
  showMedicalOverlay = false;
  showOverlayHistoryEdit = false;
  selectedPet: any;
  selectedHistory: any;

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
        this.vet = this.userData.user_type_id==2;

        console.log(this.vet);
        
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

  deleteHistory(historyId: number){

    this.userData = this.authService.request(true)
    .subscribe({
      next: (res: any) => {
        this.userData = res;
        const headers = new HttpHeaders({
          'Authorization': 'Bearer '+ this.userData.token
        });

        this.http.delete(`http://localhost:8000/api/medicalHistory/delete/${historyId}`, { headers }).subscribe(() => {
          this.histories= [];
          this.showMedicalOverlay = false;
        });
 
      },
      error: (err: any) => {
        console.error('Error occurred:', err);
      }
    });

  }


  showOverMedicalHistories(petId: number) {
    this.showMedicalOverlay = !this.showOverlay;

    this.http.get(`http://localhost:8000/api/medicalHistory/getByPet/${petId}`, { withCredentials: true })
    .subscribe({
      next: (res: any) => {
        this.histories = res;


      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });

  }

  showOver(petId: number) {

    this.showOverlay = !this.showOverlay;
    this.selectedPet = petId;
  }

  showOverlayHistoryUpdate(historyId: number) {

    this.selectedHistory = historyId;
    this.showOverlayHistoryEdit = !this.showOverlayHistoryEdit;
    // this.selectedPet = petId;



  }
  togleOverlayHistoryUpdate() {
    // this.pets= [];
    this.showOverlayHistoryEdit = false;
  }

  togleOverlay() {
    // this.pets= [];
    this.showOverlay = false;
  }
  
  togleMedicalHistoriesOverlay() {
    this.histories= [];
    this.showMedicalOverlay = false;
  }


  goToPets() {
    this.router.navigate(['/pet/create']);
  }

  goToCreateMedicalHistory(petId: number) {
    this.router.navigate(['/medicalHistory/create/',petId]);
  }
  
  goToEditPet(petId:number) {
    this.router.navigate(['/pet/update/',petId]);
  }

  

  }


