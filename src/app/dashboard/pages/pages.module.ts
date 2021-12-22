import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TravelComponent } from './travel/travel.component';
import { HistoryComponent } from './history/history.component';

import { ComponentsModule } from '../components/components.module';
import { MaterialModule } from '../../material/material/material.module';
import { ListsComponent } from './lists/lists.component';
import { RegisterComponent } from './register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    TravelComponent,
    HistoryComponent,
    RegisterComponent,
    ListsComponent
  ],
  imports: [
    CommonModule, 
    ComponentsModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    TravelComponent, 
    HistoryComponent,
    RegisterComponent,
    ListsComponent
  ]
})
export class PagesModule { }
