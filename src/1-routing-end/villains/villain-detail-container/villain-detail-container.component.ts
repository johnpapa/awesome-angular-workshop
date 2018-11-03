import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { finalize, map, tap } from 'rxjs/operators';
import { Villain } from '../../core';
import { VillainService } from '../villain.service';

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
    private route: ActivatedRoute
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

  enableAddMode() {
    this.selectedVillain = <any>{};
  }

  getVillain() {
    this.loading = true;
    this.villainService
      .getVillain(this.id)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(villain => (this.selectedVillain = villain));
    this.unselect();
  }

  update(villain: Villain) {
    this.loading = true;
    this.villainService
      .updateVillain(villain)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe();
  }

  add(villain: Villain) {
    this.loading = true;
    this.villainService
      .addVillain(villain)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe();
  }

  unselect() {
    this.selectedVillain = null;
  }
}
