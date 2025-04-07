import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-update-user',
  imports: [ReactiveFormsModule],
  templateUrl: './update-user.component.html',
  styleUrl: './update-user.component.css'
})
export class UpdateUserComponent {

  form!: FormGroup;
  // selectedFile:any;
  userData: any;
  userId: any;


  name: any;
  email: any;
  // password: any;
  // image: any;

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
  ){
  }

  ngOnInit(): void {

    this.form = this.formBuilder.group({
      name: [''],
      email: [''],
      password: [''],

    });

    this.userId = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:8000/api/user/get/${this.userId}`, { withCredentials: true })
    .subscribe({
      next: (res: any) => {

        this.name = res.name
        this.email = res.email



      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });


  }

  submit(userId: number): void {
    const formData = new FormData();

    Object.keys(this.form.controls).forEach(key => {

      if (key == 'password') {
        console.log("asdfsfafasff");
        
        if (this.form.get(key)?.value != ' ' && this.form.get(key)?.value != '') {
          formData.append(key, this.form.get(key)?.value);
        }
      } else {
        formData.append(key, this.form.get(key)?.value);
      }

    });

    this.userData = this.authService.request(false)
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ this.userData.token,

    });

    this.http.patch(`http://localhost:8000/api/user/update/${userId}`, this.form.getRawValue(), { headers }).subscribe(res => {
      this.router.navigate(['user/list']);
    });

  }


}
