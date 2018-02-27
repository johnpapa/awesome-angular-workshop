import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VillainsRoutingModule } from './villains-routing.module';
import { VillainDetailComponent } from './villain-detail/villain-detail.component';
import { VillainsComponent } from './villains/villains.component';
import { VillainListComponent } from './villain-list/villain-list.component';
import { VillainService } from './villain.service';
import { VillainDetailContainerComponent } from './villain-detail-container/villain-detail-container.component';
import { MatProgressSpinnerModule, MatButtonModule, MatCardModule, MatInputModule, MatIconModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    VillainsRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule
  ],
  exports: [VillainsComponent, VillainDetailComponent],
  declarations: [
    VillainsComponent,
    VillainDetailComponent,
    VillainListComponent,
    VillainDetailContainerComponent
  ],
  providers: [VillainService]
})
export class VillainsModule {}
