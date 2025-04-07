import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Emitters } from '../../emiters/emiters';

@Component({
  selector: 'app-create-medical-history',
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './create-medical-history.component.html',
  styleUrl: './create-medical-history.component.css'
})
export class CreateMedicalHistoryComponent {
  form!: FormGroup;
  selectedFile:any;
  userData: any;
  @Input() petId: number = 0; 
  // @Output() showOverlay = new EventEmitter<boolean>();

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router,
    private authService: AuthService
  ){
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [''],
      content: [''],
      pet_id: [''],
    });
  }

  submit(): void {
    const formData = new FormData();

    this.form.patchValue({'pet_id': this.petId});
    Object.keys(this.form.controls).forEach(key => {
      formData.append(key, this.form.get(key)?.value);
    });
    
    this.userData = this.authService.request(false)
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ this.userData.token,
    });

    this.http.post('http://localhost:8000/api/medicalHistory/create', this.form.getRawValue(), { headers }).subscribe(res => {
      this.router.navigate(['/']);
      // location.reload();
      // this.showOverlay.emit(false);
      
    });
  }

}
