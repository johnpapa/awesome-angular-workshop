import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGuard } from './core/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'heroes' },
  {
    path: 'heroes',
    loadChildren: '1-routing-guards-end/heroes/heroes.module#HeroesModule',
  },
  {
    path: 'villains',
    loadChildren: '1-routing-guards-end/villains/villains.module#VillainsModule',
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [
    // RouterModule.forRoot(routes)

    // Preload All - Strategy
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    })

  ],

  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule {}
