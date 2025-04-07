import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-list-users',
  imports: [CommonModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.scss'
})
export class ListUsersComponent {

  users: any[] = [];
  last_name: any;
  userData: any;
  userId: any;
  pets: any[] = [];
  showOverlay = false;
  // show_check = false;

  constructor(
    private http: HttpClient,
    private authService:AuthService,
    private router: Router
    // private router: Router
  ) {

  }

  ngOnInit(): void {
    
    this.userData = this.authService.request(false)
    this.loadUsers()


  }


  loadUsers(){

    this.http.get('http://localhost:8000/api/user/index', { withCredentials: true })
    .subscribe({
      next: (res: any) => {
        this.users = res;
        this.users.forEach((user) => {
          
          if (user.id != this.userData.id) {
            user['show_check'] = true
          } else {
            user['show_check'] = false
          }


          user['last_name'] =user['name'].split(" ")
          if (user['last_name'].length > 1) {
            user['last_name'] = user['last_name'][1].toString()
          } else {
            if (user['name'].length >1) {
              user['last_name'] = user['name'][1].toString()
            } else {
              user['last_name'] = ' '
            }
          }


          user['created_at'] = user['created_at'].slice(0,10)

        });

      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });
  }

  getInitials(firstName:string, lastName:string) {
    return firstName[0].toUpperCase() + lastName[0].toUpperCase();
  }



  swithcActive(userId:number, isActive:boolean): void {

    this.userData = this.authService.request(true)
    .subscribe({
      next: (res: any) => {

        this.http.patch(`http://localhost:8000/api/user/update/${userId}`, {"is_active": isActive!=true}, { withCredentials:true }).subscribe(() => {
          this.userData = this.authService.request(false)
          this.loadUsers()
        });
 
      },
      error: (err: any) => {
        console.error('Error occurred:', err);
      }
    });

  }

  goToEditUser(userId: number) {
    this.router.navigate(['/user/update',userId]);
  }


  showOver(userId: number) {

    this.showOverlay = !this.showOverlay;
    if (this.showOverlay) {


      this.http.get(`http://localhost:8000/api/pet/getByUser/${userId}`, { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          this.pets = res;
          // this.admin = this.userData.user_type_id==3;
          // this.isLoading = false;
  
        },
        error: (err) => {
          console.error('Error occurred:', err);
        }
      });

      // listPets(userId: any) 
    }

  }

  togleOverlay() {
    this.pets= [];
    this.showOverlay = false;
  }

  newVet() {
    this.router.navigate(['/user/create']);
  }


}
