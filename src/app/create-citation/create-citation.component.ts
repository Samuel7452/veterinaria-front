import { HttpClient, HttpClientModule, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-citation',
  imports: [FormsModule, ReactiveFormsModule,CommonModule, HttpClientModule],
  templateUrl: './create-citation.component.html',
  styleUrl: './create-citation.component.css'
})
export class CreateCitationComponent {
  form!: FormGroup;
  userData: any;


  pets: any[] = [];
  vets: any[] = [];

  currentMonthIndex: number = new Date().getMonth(); // Inicia en el mes actual

  bussyDates: string[] = []; // formato 'YYYY-MM-DD'

  calendarDays: Date[] = [];
  
  selectedDate: Date | null = null;

  calendarByMonth: { name: string, days: Date[] }[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private http:HttpClient,
    private router: Router,
    private authService: AuthService
  ){
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      pet_id: [''],
      vet_id: [''],
      date: ['']
    });

    this.generateYearCalendar();
    this.getPets();
    this.getVets();

  }

  submit(): void {
    const formData = new FormData();

    Object.keys(this.form.controls).forEach(key => {
      formData.append(key, this.form.get(key)?.value);
    });

    this.userData = this.authService.request(false)
    const headers = new HttpHeaders({
      'Authorization': 'Bearer '+ this.userData.token,

    });

    this.http.post<FormData>('http://localhost:8000/api/citation/create/', formData, { headers }).subscribe(res => {
      this.router.navigate(['/pets']);
    });
  }

  getPets(){


      // this.isLoading = true; 
      if (this.userData == undefined) {
        this.userData = this.authService.request(false)
      }
      this.http.get('http://localhost:8000/api/pet', { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          this.pets = res;
        },
        error: (err) => {
          console.error('Error occurred:', err);
        }
      });

  }
  getVets(){


      // this.isLoading = true; 
      if (this.userData == undefined) {
        this.userData = this.authService.request(false)
      }
      this.http.get('http://localhost:8000/api/user/getVets', { withCredentials: true })
      .subscribe({
        next: (res: any) => {
          this.vets = res;
        },
        error: (err) => {
          console.error('Error occurred:', err);
        }
      });

  }

  getBussyDates(event: Event){

    this.bussyDates=[]
    const vetId = +(event.target as HTMLSelectElement).value;

    this.http.get( `http://localhost:8000/api/citation/getBussyDates/${vetId}`, { withCredentials: true })
    .subscribe({
      next: (res: any) => {


        res.forEach((date: any) => {
          this.bussyDates.push(date['date']);
        });
        
      },
      error: (err) => { 
        console.error('Error occurred:', err);
      }
    });


  }
  
  generateYearCalendar() {
    const monthNames = [
      'Enero', 'Febrero', 'Marzo', 'Abril',
      'Mayo', 'Junio', 'Julio', 'Agosto',
      'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
    ];
  
    const year = new Date().getFullYear();
    this.calendarByMonth = [];
  
    for (let month = 0; month < 12; month++) {
      const daysInMonth = new Date(year, month + 1, 0).getDate();
      const days: Date[] = [];
  
      for (let day = 1; day <= daysInMonth; day++) {
        days.push(new Date(year, month, day));
      }
  
      this.calendarByMonth.push({
        name: monthNames[month],
        days
      });
    }
  }
  
  isBusy(day: Date): boolean {
    const dateStr = day.toISOString().split('T')[0];
    return this.bussyDates.includes(dateStr);
  }
  
  isSelected(day: Date): boolean {
    return this.selectedDate?.toDateString() === day.toDateString();
  }
  
  selectDate(day: Date) {
    if (this.isBusy(day)) return;
    this.selectedDate = day;
    this.form.get('date')?.setValue(day.toISOString().split('T')[0]);
  }
  
  prevMonth() {
    if (this.currentMonthIndex > 0) {
      this.currentMonthIndex--;
    }
  }
  
  nextMonth() {
    if (this.currentMonthIndex < 11) {
      this.currentMonthIndex++;
    }
  }

  

}
