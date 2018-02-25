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
    this.getHeroes();
  }

  clear() {
    this.addingHero = false;
    this.selectedHero = null;
  }

  deleteHero(hero: Hero) {
    this.unselect();
    this.heroService.deleteHero(hero).subscribe(() => {
      this.heroes = this.heroes.filter(h => h.id !== hero.id);
    });
  }

  enableAddMode() {
    this.addingHero = true;
    this.selectedHero = null;
  }

  getHeroes() {
    this.heroService.getHeroes().subscribe(heroes => (this.heroes = heroes));
    this.unselect();
  }

  onSelect(hero: Hero) {
    this.addingHero = false;
    this.selectedHero = hero;
  }

  update(hero: Hero) {
    this.heroService.updateHero(hero).subscribe(() => {
      this.heroes = this.heroes.map(h => (h.id === hero.id ? hero : h));
    });
  }

  add(hero: Hero) {
    this.heroService.addHero(hero).subscribe(addedHero => {
      this.heroes = this.heroes.concat(addedHero);
    });
  }

  unselect() {
    this.addingHero = false;
    this.selectedHero = null;
  }
}
