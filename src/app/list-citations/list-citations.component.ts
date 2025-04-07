import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-citations',
  imports: [CommonModule],
  templateUrl: './list-citations.component.html',
  styleUrl: './list-citations.component.css'
})
export class ListCitationsComponent {

  citations: any[] = [];
  userData: any;

  constructor(
    private http: HttpClient,
    private authService:AuthService,
    private router: Router
    // private router: Router
  ) {

  }

  ngOnInit(): void {
    
    this.userData = this.authService.request(false)
    this.loadCitations(this.userData.id)


  }



  loadCitations(userId: number){

    this.http.get( `http://localhost:8000/api/citation/getByUser/${userId}`, { withCredentials: true })
    .subscribe({
      next: (res: any) => {
        this.citations = res;
        
      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });
  }


}
