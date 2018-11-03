import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Hero } from '../../core';
import { FilterObserver } from '../../shared/filter';
import { HeroService } from '../heroes.service';

@Component({
  selector: 'aw-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeroesComponent implements OnInit {
  selectedHero: Hero;

  filterObserver: FilterObserver;
  filteredHeroes$: Observable<Hero[]>;
  loading$: Observable<boolean>;

  constructor(public heroService: HeroService) {
    this.filterObserver = heroService.filterObserver;
    this.filteredHeroes$ = heroService.filteredEntities$;
    this.loading$ = this.heroService.loading$;
  }

  ngOnInit() {
    this.getHeroes();
  }

  clear() {
    this.selectedHero = null;
  }

  deleteHero(hero: Hero) {
    this.unselect();
    this.heroService.delete(hero.id);
  }

  enableAddMode() {
    this.selectedHero = <any>{};
  }

  getHeroes() {
    this.heroService.getAll();
    this.unselect();
  }

  onSelect(hero: Hero) {
    this.selectedHero = hero;
  }

  update(hero: Hero) {
    this.heroService.update(hero);
  }

  add(hero: Hero) {
    this.heroService.add(hero);
  }

  unselect() {
    this.selectedHero = null;
  }
}
