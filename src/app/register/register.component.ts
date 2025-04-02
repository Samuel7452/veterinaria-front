import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router
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

    
    this.http.post('http://localhost:8000/api/register', this.form.getRawValue()).subscribe(res => {
      this.router.navigate(['/login']);
    });
    
  }


}
