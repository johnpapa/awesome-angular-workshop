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

  loading: boolean;
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
    this.loading = false;
    this.sendMessage('Close')();
  }

  enableAddMode() {
    this.selectedVillain = null;
  }

  getVillain() {
    this.clear();
    this.loading = true;
    this.villainService
      .getVillain(this.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(villain => (this.selectedVillain = villain));
  }

  add(villain: Villain) {
    this.loading = true;
    this.villainService
      .addVillain(villain)
      .pipe(
        tap(this.sendMessage('Added')),
        finalize(() => this.close())
      )
      .subscribe();
  }

  update(villain: Villain) {
    this.loading = true;
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
