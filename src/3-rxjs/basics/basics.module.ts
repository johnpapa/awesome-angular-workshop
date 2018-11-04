import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { Basic01Component } from './basic-01.component';
import { Basic02Component } from './basic-02.component';
import { Basic03Component } from './basic-03.component';
import { Basic04Component } from './basic-04.component';
import { Basic05Component } from './basic-05.component';
import { Basic06Component } from './basic-06.component';
import { Basic07Component } from './basic-07.component';

import { BasicsComponent } from './basics.component';

const routes: Routes = [{ path: '', pathMatch: 'full', component: BasicsComponent }];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    Basic01Component,
    Basic02Component,
    Basic03Component,
    Basic04Component,
    Basic05Component,
    Basic06Component,
    Basic07Component,
    BasicsComponent,
  ]
})
export class BasicsModule { }
