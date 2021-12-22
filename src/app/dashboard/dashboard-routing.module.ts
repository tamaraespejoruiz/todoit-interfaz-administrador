import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { TravelComponent } from './pages/travel/travel.component';
import { HistoryComponent } from './pages/history/history.component';
import { RegisterComponent } from './pages/register/register.component';
import { ListsComponent } from './pages/lists/lists.component';

const routes: Routes = [
  { 
    path: '', component: DashboardComponent,
    
    children: [
      { path: 'travel', component: TravelComponent}, 
      { path: 'history', component: HistoryComponent},
      { path: 'register', component: RegisterComponent},
      { path: 'lists', component: ListsComponent}
    ],

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
