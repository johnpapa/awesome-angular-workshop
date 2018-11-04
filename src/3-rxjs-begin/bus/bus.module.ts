import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { BusContainerComponent } from './bus-container.component';
import { BlueComponent } from './blue.component';
import { GreenComponent } from './green.component';
import { RedComponent } from './red.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: BusContainerComponent }];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    BusContainerComponent,
    BlueComponent,
    GreenComponent,
    RedComponent
  ]
})
export class BusModule {}
