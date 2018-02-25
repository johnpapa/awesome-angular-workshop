import {
  Component,
  Input,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
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
export class VillainDetailComponent implements OnChanges, OnInit {
  @Input() villain: Villain;
  @Output() unselect = new EventEmitter<string>();
  @Output() add = new EventEmitter<Villain>();
  @Output() update = new EventEmitter<Villain>();

  @ViewChild('name') nameElement: ElementRef;

  editingVillain: Villain;
  addMode = false;

  constructor() {}

  // ngAfterViewInit() {
  //   this.setFocus();
  // }

  ngOnInit() {
    // this.addMode = !this.villain;
    // this.editingVillain = { ...this.villain };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!changes.villain.firstChange) {
      this.setFocus();
    }
    this.editingVillain = { ...this.villain };
    if (this.villain && this.villain.id) {
      this.addMode = false;
    } else {
      this.addMode = true;
    }
  }

  addVillain() {
    this.add.emit({ ...this.villain, ...this.editingVillain });
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
    this.add.emit({ ...this.villain, ...this.editingVillain });
    this.clear();
  }
}
