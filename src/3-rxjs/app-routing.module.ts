import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'heroes' },
  {
    path: 'heroes',
    loadChildren: '3-rxjs/heroes/heroes.module#HeroesModule'
  },
  {
    path: 'villains',
    loadChildren: '3-rxjs/villains/villains.module#VillainsModule'
  },
  {
    path: 'basics',
    loadChildren: '3-rxjs/basics/basics.module#BasicsModule'
  },
  {
    path: 'play-ops',
    loadChildren: '3-rxjs/play-ops/play-ops.module#PlayOpsModule'
  },
  {
    path: 'play-subject',
    loadChildren: '3-rxjs/play-subject/play-subject.module#PlaySubjectModule'
  },
  {
    path: 'unsubscribe',
    loadChildren: '3-rxjs/unsubscribe/unsubscribe.module#UnsubscribeModule'
  },
  {
    path: 'bus',
    loadChildren: '3-rxjs/bus/bus.module#BusModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
