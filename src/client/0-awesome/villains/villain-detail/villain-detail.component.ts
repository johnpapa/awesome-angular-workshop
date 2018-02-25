import {
  Component,
  Input,
  ElementRef,
  EventEmitter,
  OnChanges,
  Output,
  ViewChild,
  SimpleChanges
} from '@angular/core';

import { Villain } from '../../core';

@Component({
  selector: 'aw-villain-detail',
  templateUrl: './villain-detail.component.html',
  styleUrls: ['./villain-detail.component.scss']
})
export class VillainDetailComponent implements OnChanges {
  @Input() villain: Villain;
  @Output() unselect = new EventEmitter<string>();
  @Output() add = new EventEmitter<Villain>();
  @Output() update = new EventEmitter<Villain>();

  @ViewChild('name') nameElement: ElementRef;

  editingVillain: Villain;
  addMode = false;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    this.setFocus();
    if (this.villain && this.villain.id) {
      this.editingVillain = { ...this.villain };
      this.addMode = false;
    } else {
      this.editingVillain = { id: undefined, name: '', saying: '' };
      this.addMode = true;
    }
  }

  addVillain() {
    this.add.emit(this.editingVillain);
    this.clear();
  }

  clear() {
    this.unselect.emit();
  }

  saveVillain() {
    if (this.addMode) {
      this.addVillain();
    } else {
      this.updateVillain();
    }
  }

  setFocus() {
    this.nameElement.nativeElement.focus();
  }

  updateVillain() {
    this.update.emit(this.editingVillain);
    this.clear();
  }
}
