import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { PlaySubjectComponent } from './play-subject.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: PlaySubjectComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [ PlaySubjectComponent ],
})
export class PlaySubjectModule {}
