import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PlayOpsComponent } from './play-ops.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: PlayOpsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ PlayOpsComponent ],
})
export class PlayOpsModule {}
