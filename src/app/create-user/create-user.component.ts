import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-create-user',
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css'
})
export class CreateUserComponent {
  form!: FormGroup;
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router,
    private authService:AuthService
  ){
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      password: ['']
    });
  }

  submit(): void {

    this.userData = this.authService.request(true)
    .subscribe({
      next: (res: any) => {
        this.userData = res;
        this.userData = this.authService.request(false)
        const headers = new HttpHeaders({
          'Authorization': 'Bearer '+ this.userData.token,
    
        });
    
        this.http.post('http://localhost:8000/api/register/veterinarian/', this.form.getRawValue(), { headers }).subscribe(res => {
          this.router.navigate(['/user/list']);
        });
 
      },
      error: (err: any) => {
        console.error('Error occurred:', err);
      }
    });



    

    
  }

}
