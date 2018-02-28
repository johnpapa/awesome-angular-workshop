import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { RawComponent } from './raw.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: RawComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ RawComponent ],
})
export class RawModule {}
