import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs/Observable';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest, finalize } from 'rxjs/operators';

import { FilterObserver } from '../../shared/filter';
import { Hero } from '../../core';
import { HeroService } from '../hero.service';

@Component({
  selector: 'aw-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  addingHero = false;
  selectedHero: Hero;

  // for filtering
  filterObserver: FilterObserver;
  filteredHeroes$: Observable<Hero[]>;
  heroes$: Observable<Hero[]>;
  loading$: Observable<boolean>;

  constructor(private heroService: HeroService) {
    this.filterObserver = heroService.filterObserver;
    this.heroes$ = heroService.heroes$;
    this.filteredHeroes$ = heroService.filteredHeroes$;
  }

  ngOnInit() {
    this.getHeroes();
  }

  clear() {
    this.addingHero = false;
    this.selectedHero = null;
  }

  enableAddMode() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  getHeroes() {
    this.heroService.getHeroes();
  }

  add(hero: Hero) {
    this.heroService.addHero(hero);
  }

  deleteHero(hero: Hero) {
    this.heroService.deleteHero(hero);
  }

  update(hero: Hero) {
    this.heroService.updateHero(hero);
  }

  onSelect(hero: Hero) {
    this.addingHero = false;
    this.selectedHero = hero;
  }

  unselect() {
    this.addingHero = false;
    this.selectedHero = null;
  }

}
