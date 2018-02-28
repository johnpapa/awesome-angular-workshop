import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'aw-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  labTitle = '3-rxjs';
  labState = '';

  constructor(private messageService: MessageService) {}

  // Send a message that would close VillainDetailsContainer
  // IF the MessageService were not shadowed (which it is)
  // Prove it by removing MessageService provider from VillainsModule.
  fakeMessage() {
    this.messageService.send('Fake close', 'VillainDetailContainer');
  }
}
