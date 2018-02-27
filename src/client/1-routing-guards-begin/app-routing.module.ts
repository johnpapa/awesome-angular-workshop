import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
// import { AuthGuard } from './core/auth-guard.service';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'heroes' },
  {
    path: 'heroes',
    loadChildren: '1-routing-guards-begin/heroes/heroes.module#HeroesModule'
  },
  {
    path: 'villains',
    loadChildren: '1-routing-guards-begin/villains/villains.module#VillainsModule'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)

    // Solution - Preload All - Strategy
    // RouterModule.forRoot(routes, {
    //   preloadingStrategy: PreloadAllModules
    // })
  ],

  exports: [RouterModule]
  // providers: [AuthGuard]
})
export class AppRoutingModule {}
