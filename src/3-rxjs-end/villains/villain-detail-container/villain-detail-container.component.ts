import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, tap } from 'rxjs/operators';
import { MessageService, Villain } from '../../core';
import { VillainService } from '../villain.service';

export const VILLAIN_DETAIL_CONTAINER = 'VillainDetailContainer';

@Component({
  selector: 'aw-villain-detail-container',
  templateUrl: './villain-detail-container.component.html',
  styleUrls: ['./villain-detail-container.component.scss']
})
export class VillainDetailContainerComponent implements OnInit {
  selectedVillain: Villain;

  private id: number;

  constructor(
    private villainService: VillainService,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.route.params
      .pipe(
        map(params => params['id']),
        tap(id => (this.id = +id))
      )
      .subscribe(id => (id > 0 ? this.getVillain() : this.enableAddMode()));
  }

  clear() {
    this.selectedVillain = null;
  }

  close() {
    this.sendMessage('Close')();
  }

  enableAddMode() {
    this.selectedVillain = <any>{};
  }

  getVillain() {
    this.clear();
    this.villainService
      .getVillain(this.id)
      .subscribe(villain => (this.selectedVillain = villain));
  }

  add(villain: Villain) {
    this.villainService
      .addVillain(villain)
      .pipe(
        tap(this.sendMessage('Added')),
        finalize(() => this.close())
      )
      .subscribe();
  }

  update(villain: Villain) {
    this.villainService
      .updateVillain(villain)
      .pipe(
        tap(this.sendMessage('Updated')),
        finalize(() => this.close())
      )
      .subscribe();
  }

  private sendMessage(operation: string) {
    return () =>
      this.messageService.send(
        `${operation} Villain`,
        VILLAIN_DETAIL_CONTAINER
      );
  }
}
