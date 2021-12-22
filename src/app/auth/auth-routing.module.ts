import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth.component';
import { PageLoginComponent } from './pages/page-login/page-login.component';
import { RegisterComponent } from '../dashboard/pages/register/register.component';

const routes: Routes = [
  { 
    path: '', component: AuthComponent,
    
    children: [
      { path: 'login', component: PageLoginComponent }
    ],
  
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
