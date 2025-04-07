import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-update-pet',
  imports: [ReactiveFormsModule],
  templateUrl: './update-pet.component.html',
  styleUrl: './update-pet.component.css'
})
// export class UpdatePetComponent {
export class UpdatePetComponent implements OnInit {
  form!: FormGroup;
  selectedFile:any;
  userData: any;
  petId: any;


  name: any;
  species: any;
  breed: any;
  birth_date: any;
  image: any;

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
      species: [''],
      breed: [''],
      birth_date: [''],
      image: ['']
    });

    this.petId = this.route.snapshot.paramMap.get('id');
    this.http.get(`http://localhost:8000/api/pet/get/${this.petId}`, { withCredentials: true })
    .subscribe({
      next: (res: any) => {
        this.name = res.name
        this.species = res.species
        this.breed = res.breed
        this.birth_date = res.birth_date
        this.image = res.image
      },
      error: (err) => {
        console.error('Error occurred:', err);
      }
    });


  }

  onFileSelected(event: any) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
    }
  }

  submit(petId: number): void {
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

    this.http.post<FormData>(`http://localhost:8000/api/pet/update/${petId}`, formData, { headers }).subscribe(res => {
      this.router.navigate(['/pets']);
    });

  }

}
