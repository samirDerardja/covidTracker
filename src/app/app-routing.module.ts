import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PaysComponent } from './components/pays/pays.component';
import { DashboardCardComponent } from './components/dashboard-card/dashboard-card.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';



export const routes: Routes = [
  {path: 'home' , component : HomeComponent},
  {path: 'dashboard' , component : DashboardCardComponent},
  {path: 'pays' , component : PaysComponent},
  {path: 'register' , component : RegisterComponent},
  {path: 'login' , component : LoginComponent},
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes ,{ paramsInheritanceStrategy: 'always'})],
  exports: [RouterModule]
})


export class AppRoutingModule { }
