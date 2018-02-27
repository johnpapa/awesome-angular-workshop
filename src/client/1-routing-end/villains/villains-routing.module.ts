import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VillainsComponent } from './villains/villains.component';
import { VillainDetailContainerComponent } from './villain-detail-container/villain-detail-container.component';

const routes: Routes = [
  {
    path: '',
    component: VillainsComponent,
    children: [
      { path: 'details/:id', component: VillainDetailContainerComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VillainsRoutingModule {}
