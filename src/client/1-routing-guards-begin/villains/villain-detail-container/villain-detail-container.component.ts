import { Component, OnInit } from '@angular/core';
import { finalize, map, tap } from 'rxjs/operators';

import { Villain } from '../../core';
import { VillainService } from '../villain.service';

@Component({
  selector: 'aw-villain-detail-container',
  templateUrl: './villain-detail-container.component.html',
  styleUrls: ['./villain-detail-container.component.scss']
})
export class VillainDetailContainerComponent implements OnInit {
  addingVillain = false;
  selectedVillain: Villain;

  loading: boolean;
  private id: number;

  constructor(private villainService: VillainService) {}

  ngOnInit() {
    // TODO: Step 8
    // Get the id route parameter.
    // If it is > 0, get the villain, else enable add mode.
    // TODO: Step 8 - Solution
    // this.route.params
    //   .pipe(map(params => params['id']), tap(id => (this.id = +id)))
    //   .subscribe(id => (id > 0 ? this.getVillain() : this.enableAddMode()));
  }

  clear() {
    this.addingVillain = false;
    this.selectedVillain = null;
  }

  enableAddMode() {
    this.addingVillain = true;
    this.selectedVillain = null;
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
    this.addingVillain = false;
    this.selectedVillain = null;
  }
}
