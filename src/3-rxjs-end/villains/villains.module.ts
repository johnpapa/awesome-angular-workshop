import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VillainsRoutingModule } from './villains-routing.module';
import { VillainDetailComponent } from './villain-detail/villain-detail.component';
import { VillainsComponent } from './villains/villains.component';
import { VillainListComponent } from './villain-list/villain-list.component';
import { VillainService } from './villain.service';
import { SharedModule } from '../shared/shared.module';
import { VillainDetailContainerComponent } from './villain-detail-container/villain-detail-container.component';

import { MessageService } from '../core';

@NgModule({
  imports: [CommonModule, SharedModule, VillainsRoutingModule],
  exports: [VillainsComponent, VillainDetailComponent],
  declarations: [
    VillainsComponent,
    VillainDetailComponent,
    VillainListComponent,
    VillainDetailContainerComponent
  ],

  providers: [
    // Module gets a private MessageService
    // MessageService, // <-- what happens if commented out?
  ]
})
export class VillainsModule {
  constructor(messageService: MessageService) {
    messageService.send('Villains Module Loaded', 'VillainsModule');
  }
}
