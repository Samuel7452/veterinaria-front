import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { CreateCitationComponent } from '../create-citation/create-citation.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-list-citations',
  imports: [FormsModule,ReactiveFormsModule, CommonModule, CreateCitationComponent, HttpClientModule, CommonModule],
  templateUrl: './list-citations.component.html',
  styleUrl: './list-citations.component.css'
})
export class ListCitationsComponent {

  citations: any[] = [];
  userData: any;
  vet = false;
  admin = false;
  showOverlay = false;

  constructor(
    private http: HttpClient,
    private authService:AuthService,
    private router: Router
    // private router: Router
  ) {

  }

  ngOnInit(): void {
    
    this.userData = this.authService.request(false)
    this.vet = this.userData.user_type_id==2;
    this.admin = this.userData.user_type_id==3;
    this.loadCitations(this.userData.id)


  }



  loadCitations(userId: number){
    if (this.admin) {
      this.http.get( `http://localhost:8000/api/citation/index/`, { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          this.citations = res;
          
        },
        error: (err) => { 
          console.error('Error occurred:', err);
        }
      });
    } else {
    if (this.vet == false) {
      
          this.http.get( `http://localhost:8000/api/citation/getByUser/${userId}`, { withCredentials: true })
          .subscribe({
            next: (res: any) => {
              this.citations = res;
              
            },
            error: (err) => { 
              console.error('Error occurred:', err);
            }
          });
          
        } else {
          this.http.get( `http://localhost:8000/api/citation/getByVet/${userId}`, { withCredentials: true })
          .subscribe({
            next: (res: any) => {
              this.citations = res;
              
            },
            error: (err) => { 
              console.error('Error occurred:', err);
            }
          });
          
    } }
  }



  swithcActive(citationId:number, isActive:boolean): void {

    this.userData = this.authService.request(true)
    .subscribe({
      next: (res: any) => {

        this.http.patch(`http://localhost:8000/api/citation/update/${citationId}`, {"is_active": isActive!=true}, { withCredentials:true }).subscribe(() => {
          this.userData = this.authService.request(false);
          this.loadCitations(this.userData.id);
        });
 
      },
      error: (err: any) => {
        console.error('Error occurred:', err);
      }
    });

  } 


  deleteCitation(citationId: number){

    this.userData = this.authService.request(true)
    .subscribe({
      next: (res: any) => {
        this.userData = res;
        const headers = new HttpHeaders({
          'Authorization': 'Bearer '+ this.userData.token
        });

        this.http.delete(`http://localhost:8000/api/citation/delete/${citationId}`, { headers }).subscribe(() => {
          this.userData = this.authService.request(false);
          this.loadCitations(this.userData.id);
        });
 
      },
      error: (err: any) => {
        console.error('Error occurred:', err);
      }
    });

  }


  showOver() {

    this.showOverlay = !this.showOverlay;
  }
  togleOverlay() {
    this.showOverlay = false;
  }


}
