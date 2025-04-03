import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AuthService } from '../auth.service';
import { empty } from 'rxjs';

@Component({
  selector: 'app-create-pet',
  imports: [FormsModule, ReactiveFormsModule],
  templateUrl: './create-pet.component.html',
  styleUrl: './create-pet.component.css'
})
export class CreatePetComponent {
  form!: FormGroup;
  selectedFile:any;
  userData: any;

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router,
    private authService: AuthService
  ){
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [''],
      species: [''],
      breed: [''],
      birth_date: [''],
      image: ['']
    });
  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submit(): void {
    const formData = new FormData();

    Object.keys(this.form.controls).forEach(key => {
      formData.append(key, this.form.get(key)?.value);
    });

    // Append image file
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    this.userData = this.authService.request(false)
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ this.userData.token,

    });

    this.http.post<FormData>('http://localhost:8000/api/pet/create', formData, { headers }).subscribe(res => {
      this.router.navigate(['/pets']);
    });
  }



}
