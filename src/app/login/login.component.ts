import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule  } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';



@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router
  ){
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: [''],
      password: ['']
    });
  }

  submit(): void {

    
    this.http.post('http://localhost:8000/api/login', this.form.getRawValue(), {
      withCredentials: true
    }).subscribe(res => {
      this.router.navigate(['/']);
    });
    
    
  }


}
