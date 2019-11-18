import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { MappingComponent } from './mapping.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', pathMatch: 'full', component: MappingComponent }];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    MappingComponent,
  ]
})
export class MappingModule {}
