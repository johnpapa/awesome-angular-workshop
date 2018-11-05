import { Component } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'aw-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  labTitle = '3-rxjs';
  labState = 'begin';

  constructor(private messageService: MessageService) {}

  // Send a message that would close VillainDetailsContainer
  sendMessage() {
    this.messageService.send('Message close', 'VillainDetailContainer');
  }

  toggleBusy() {
    // wire busy service to this button click handler
  }
 }
