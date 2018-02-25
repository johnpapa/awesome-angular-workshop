import { Component, OnInit } from '@angular/core';

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

  heroes: Hero[];
  loading: boolean;

  constructor(private heroService: HeroService) {}

  ngOnInit() {
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
  }

  clear() {
    this.addingHero = false;
    this.selectedHero = null;
  }

  deleteHero(hero: Hero) {
    this.unselect();
    this.heroService.deleteHero(hero);
  }

  enableAddMode() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  getHeroes() {
    this.heroService.getHeroes();
    this.unselect();
  }

  onSelect(hero: Hero) {
    this.addingHero = false;
    this.selectedHero = hero;
  }

  update(hero: Hero) {
    this.heroService.updateHero(hero);
  }

  add(hero: Hero) {
    this.heroService.addHero(hero);
  }

  unselect() {
    this.addingHero = false;
    this.selectedHero = null;
  }
}
