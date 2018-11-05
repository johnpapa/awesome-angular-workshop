import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../core';
import { FilterObserver } from '../../shared/filter';
import { HeroService } from '../hero.service';



@Component({
  selector: 'aw-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;

  // for filtering
  filterObserver: FilterObserver;
  filteredHeroes$: Observable<Hero[]>;
  heroes$: Observable<Hero[]>;

  constructor(private heroService: HeroService) {
    this.heroes$ = heroService.heroes$;
    this.filterObserver = heroService.filterObserver;
    this.filteredHeroes$ = heroService.filteredHeroes$;
  }

  ngOnInit() {
    this.getHeroes();
  }

  clear() {
    this.selectedHero = null;
  }

  enableAddMode() {
    this.selectedHero = <any>{};
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
    this.selectedHero = hero;
  }

  unselect() {
    this.selectedHero = null;
  }
}
