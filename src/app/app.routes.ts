import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PetsComponent } from './pets/pets.component';
import { CreatePetComponent } from './create-pet/create-pet.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'pets', component: PetsComponent},
    {path: 'pet/create', component: CreatePetComponent},
];


