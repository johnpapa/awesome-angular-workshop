import { Component, OnInit } from '@angular/core';

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
    this.unselect();
    this.villainService
      .deleteVillain(villain)
      .subscribe(() => (this.villains = this.villains.filter(h => h.id !== villain.id)));
  }

  enableAddMode() {
    this.addingVillain = true;
    this.selectedVillain = null;
  }

  getVillains() {
    this.villainService.getVillains().subscribe(villains => (this.villains = villains));
    this.unselect();
  }

  onSelect(villain: Villain) {
    this.addingVillain = false;
    this.selectedVillain = villain;
  }

  update(villain: Villain) {
    this.villainService
      .updateVillain(villain)
      .subscribe(
        () => (this.villains = this.villains.map(h => (h.id === villain.id ? villain : h)))
      );
  }

  add(villain: Villain) {
    this.villainService
      .addVillain(villain)
      .subscribe(addedvillain => (this.villains = this.villains.concat(addedvillain)));
  }

  unselect() {
    this.addingVillain = false;
    this.selectedVillain = null;
  }
}
