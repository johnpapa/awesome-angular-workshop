import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'heroes' },
  {
    path: 'heroes',
    loadChildren: '3-rxjs-end/heroes/heroes.module#HeroesModule'
  },
  {
    path: 'villains',
    loadChildren: '3-rxjs-end/villains/villains.module#VillainsModule'
  },
  {
    path: 'basics',
    loadChildren: '3-rxjs-end/basics/basics.module#BasicsModule'
  },
  {
    path: 'play-ops',
    loadChildren: '3-rxjs-end/play-ops/play-ops.module#PlayOpsModule'
  },
  {
    path: 'play-subject',
    loadChildren: '3-rxjs-end/play-subject/play-subject.module#PlaySubjectModule'
  },
  {
    path: 'unsubscribe',
    loadChildren: '3-rxjs-end/unsubscribe/unsubscribe.module#UnsubscribeModule'
  },
  {
    path: 'bus',
    loadChildren: '3-rxjs-end/bus/bus.module#BusModule'
  },
  {
    path: 'mapping',
    loadChildren: '3-rxjs-end/mapping/mapping.module#MappingModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
