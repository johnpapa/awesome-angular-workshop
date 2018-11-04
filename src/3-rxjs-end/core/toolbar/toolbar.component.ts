import { Component } from '@angular/core';
import { MessageService } from '../message.service';
import { BusyService } from '../../core/busy.service';

@Component({
  selector: 'aw-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  private isBusy = false;
  labTitle = '3-rxjs';
  labState = 'end';

  constructor(private busyService: BusyService, private messageService: MessageService) {}

  // Send a message that would close VillainDetailsContainer
  sendMessage() {
    this.messageService.send('Message close', 'VillainDetailContainer');
  }

  toggleBusy() {
    this.busyService.setBusy(this.isBusy = !this.isBusy);
  }
 }
