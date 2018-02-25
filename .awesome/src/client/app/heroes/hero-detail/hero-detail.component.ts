import {
  Component,
  Input,
  ElementRef,
  EventEmitter,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
  ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';

import { Hero } from '../../core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'aw-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroDetailComponent implements OnChanges, OnInit {
  @Input() hero: Hero;
  @Output() unselect = new EventEmitter<string>();
  @Output() add = new EventEmitter<Hero>();
  @Output() update = new EventEmitter<Hero>();

  @ViewChild('name') nameElement: ElementRef;

  // editingHero: Hero;
  addMode = false;

  form = this.fb.group({
    id: [],
    name: ['', Validators.required],
    saying: ['']
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    // this.addMode = !this.hero;
    // this.editingHero = { ...this.hero };
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (!changes.hero.firstChange) {
      this.setFocus();
    // }
    if (this.hero && this.hero.id) {
      // this.editingHero = { ...this.hero };
      this.form.patchValue(this.hero);
      this.addMode = false;
    } else {
      this.addMode = true;
    }
  }

  addHero(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.add.emit({ ...this.hero, ...value });
    }
    this.clear();
  }
  // addHero() {
  //   this.add.emit({ ...this.hero, ...this.editingHero });
  //   this.clear();
  // }

  clear() {
    this.unselect.emit();
  }

  saveHero(form: FormGroup) {
    if (this.addMode) {
      this.addHero(form);
    } else {
      this.updateHero(form);
    }
  }

  setFocus() {
    this.nameElement.nativeElement.focus();
  }

  updateHero(form: FormGroup) {
    const { value, valid, touched } = form;
    if (touched && valid) {
      this.update.emit({ ...this.hero, ...value });
    }
    this.clear();
  }
  // updateHero() {
  //   this.add.emit({ ...this.hero, ...this.editingHero });
  //   this.clear();
  // }
}
