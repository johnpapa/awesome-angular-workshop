import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

import { Hero } from '../../core';
// import { HeroesService } from '../heroes.service.1'; // messy 1st version
import { HeroesService } from '../heroes.service';   // clean version

@Component({
  selector: 'aw-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  providers: [ HeroesService ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements OnInit {
  addingHero = false;
  selectedHero: Hero;

  filterObserver: Observer<string>;
  filteredHeroes$: Observable<Hero[]>;
  loading$: Observable<boolean>;

  constructor(public heroesService: HeroesService) {
    this.filterObserver = heroesService.filterObserver;
    this.filteredHeroes$ = heroesService.filteredEntities$;
    this.loading$ = this.heroesService.loading$;
  }

  ngOnInit() {
    this.getHeroes();
  }

  clear() {
    this.addingHero = false;
    this.selectedHero = null;
  }

  deleteHero(hero: Hero) {
    this.unselect();
    this.heroesService.delete(hero.id);
  }

  enableAddMode() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  getHeroes() {
    this.heroesService.getAll();
    this.unselect();
  }

  onSelect(hero: Hero) {
    this.addingHero = false;
    this.selectedHero = hero;
  }

  update(hero: Hero) {
    this.heroesService.update(hero);
  }

  add(hero: Hero) {
    this.heroesService.add(hero);
  }

  unselect() {
    this.addingHero = false;
    this.selectedHero = null;
  }
}
