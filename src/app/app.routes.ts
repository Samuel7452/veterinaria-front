import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PetsComponent } from './pets/pets.component';
import { CreatePetComponent } from './create-pet/create-pet.component';
import { UpdatePetComponent } from './update-pet/update-pet.component';
import { ListUsersComponent } from './list-users/list-users.component';

export const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'pets', component: PetsComponent},
    {path: 'pet/create', component: CreatePetComponent},
    {path: 'pet/update/:id', component: UpdatePetComponent},
    {path: 'user/list', component: ListUsersComponent},
];


