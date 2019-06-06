import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'heroes' },
  {
    path: 'heroes',
    loadChildren: () => import('3-rxjs-end/heroes/heroes.module').then(m => m.HeroesModule)
  },
  {
    path: 'villains',
    loadChildren: () => import('3-rxjs-end/villains/villains.module').then(m => m.VillainsModule)
  },
  {
    path: 'basics',
    loadChildren: () => import('3-rxjs-end/basics/basics.module').then(m => m.BasicsModule)
  },
  {
    path: 'play-ops',
    loadChildren: () => import('3-rxjs-end/play-ops/play-ops.module').then(m => m.PlayOpsModule)
  },
  {
    path: 'play-subject',
    loadChildren: () => import('3-rxjs-end/play-subject/play-subject.module').then(m => m.PlaySubjectModule)
  },
  {
    path: 'unsubscribe',
    loadChildren: () => import('3-rxjs-end/unsubscribe/unsubscribe.module').then(m => m.UnsubscribeModule)
  },
  {
    path: 'bus',
    loadChildren: () => import('3-rxjs-end/bus/bus.module').then(m => m.BusModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
