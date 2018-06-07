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
    path: 'raw',
    loadChildren: '3-rxjs/raw/raw.module#RawModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
