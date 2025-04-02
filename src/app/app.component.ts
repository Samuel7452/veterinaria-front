import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { AppNavComponent } from './app-nav/app-nav.component';
import { NavComponent } from './nav/nav.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    NavComponent,
    // HomeComponent,
    // LoginComponent,
    // RegisterComponent,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    // BrowserAnimationsModule

  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'vt_front';
}
