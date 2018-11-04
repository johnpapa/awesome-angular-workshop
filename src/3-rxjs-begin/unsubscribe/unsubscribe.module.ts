import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { AsyncPipeComponent } from './async-pipe.component';
import { LeakyComponent } from './leaky.component';
import { SubSinkComponent } from './sub-sink.component';
import { TakeUntilComponent } from './take-until.component';
import { TakeWhileComponent } from './take-while.component';
import { UnsubscribeComponent } from './unsubscribe.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: UnsubscribeComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    AsyncPipeComponent,
    LeakyComponent,
    SubSinkComponent,
    TakeUntilComponent,
    TakeWhileComponent,
    UnsubscribeComponent,
  ]
})
export class UnsubscribeModule {}

