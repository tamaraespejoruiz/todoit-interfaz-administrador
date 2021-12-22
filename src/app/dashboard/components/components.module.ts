import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from './header/header.component';
import { TableComponent } from './table/table.component';

import { MaterialModule } from '../../material.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { ListComponent } from './list/list.component';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { TableHistoryComponent } from './table-history/table-history.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    HeaderComponent,
    TableComponent,
    ListComponent,
    TableHistoryComponent
  ],
  imports: [
    CommonModule, 
    MaterialModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule, 
    RouterModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    BrowserAnimationsModule
  ],
  exports: [
    HeaderComponent, 
    TableComponent,
    ListComponent,
    TableHistoryComponent
  ]
})
export class ComponentsModule { }
