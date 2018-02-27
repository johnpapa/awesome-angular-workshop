import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'heroes' },
  {
    path: 'heroes',
    loadChildren: '2-rxjs-begin/heroes/heroes.module#HeroesModule'
  },
  {
    path: 'villains',
    loadChildren: '2-rxjs-begin/villains/villains.module#VillainsModule'
  },
  {
    path: 'raw',
    loadChildren: '2-rxjs-begin/raw/raw.module#RawModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
