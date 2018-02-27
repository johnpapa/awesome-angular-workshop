import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';

import { Villain } from '../../core';
import { VillainService } from '../villain.service';

@Component({
  selector: 'aw-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.scss']
})
export class VillainsComponent implements OnInit {
  addingVillain = false;
  selectedVillain: Villain;

  villains: Villain[];
  loading: boolean;

  constructor(private villainService: VillainService) {}

  ngOnInit() {
    this.getVillains();
  }

  clear() {
    this.addingVillain = false;
    this.selectedVillain = null;
  }

  deleteVillain(villain: Villain) {
    this.loading = true;
    this.unselect();
    this.villainService
      .deleteVillain(villain)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => (this.villains = this.villains.filter(h => h.id !== villain.id)));
  }

  enableAddMode() {
    this.addingVillain = true;
    this.selectedVillain = null;
    // TODO: Step 5
    // Navigate to the details/0
    // Make it relative to the active route

    // TODO: Step 5 - Solution
    // this.router.navigate(['details', 0], { relativeTo: this.route });
  }

  getVillains() {
    this.loading = true;
    this.villainService
      .getVillains()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(villains => (this.villains = villains));
    this.unselect();
  }

  onSelect(villain: Villain) {
    this.addingVillain = false;
    this.selectedVillain = villain;
    // TODO: Step 6
    // Navigate to the details/:id
    // Make it relative to the active route

    // TODO: Step 6 - Solution
    // this.router.navigate(['details', villain.id], { relativeTo: this.route });
  }

  update(villain: Villain) {
    this.loading = true;
    this.villainService
      .updateVillain(villain)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => (this.villains = this.villains.map(h => (h.id === villain.id ? villain : h)))
      );
  }

  add(villain: Villain) {
    this.loading = true;
    this.villainService
      .addVillain(villain)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(addedvillain => (this.villains = this.villains.concat(addedvillain)));
  }

  unselect() {
    this.addingVillain = false;
    this.selectedVillain = null;
  }
}
