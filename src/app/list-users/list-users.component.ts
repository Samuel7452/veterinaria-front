import { CommonModule } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

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

  constructor(
    private http: HttpClient,
    private authService:AuthService,
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

        this.http.patch(`http://localhost:8000/api/user/edit/${userId}`, {"is_active": isActive!=true}, { withCredentials:true }).subscribe(() => {
          this.userData = this.authService.request(false)
          this.loadUsers()
        });
 
      },
      error: (err: any) => {
        console.error('Error occurred:', err);
      }
    });

  }


}
