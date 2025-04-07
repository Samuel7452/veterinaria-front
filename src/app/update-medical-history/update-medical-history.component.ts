import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { PetsComponent } from '../pets/pets.component';

@Component({
  selector: 'app-update-medical-history',
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './update-medical-history.component.html',
  styleUrl: './update-medical-history.component.css'
})
export class UpdateMedicalHistoryComponent {

  @Input() historyId: number = 0; 
  form!: FormGroup;
  userData: any;
  title: any;
  content: any;

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
      title: [''],
      content: ['']
    });

    // this.historyId = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:8000/api/medicalHistory/get/${this.historyId}`, { withCredentials: true })
    .subscribe({
      next: (res: any) => {
        this.title = res.title
        this.content = res.content

        console.log("aaaaaaaaaaaaaaaaa", this.title);
        

      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });


  }

  submit(historyId: number): void {

    this.userData = this.authService.request(false)
    
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ this.userData.token,

    });

    this.http.patch(`http://localhost:8000/api/medicalHistory/update/${historyId}`, this.form.getRawValue(), { headers }).subscribe(res => {
      this.router.navigate(['/']);
    });

  }

}
