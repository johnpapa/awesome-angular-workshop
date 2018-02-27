import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError, combineLatest, finalize, map, tap } from 'rxjs/operators';

import { FilterObserver } from '../shared/filter';
import { Hero, ToastService } from '../core';

const api = '/api';

@Injectable()
export class HeroService {

  // service's cache of heroes
  private heroes: Hero[] = []; // simplistic cache of heroes

  // for filtering
  filterObserver: FilterObserver;
  filteredHeroes$: Observable<Hero[]>;
  heroes$ = new BehaviorSubject<Hero[]>([]);

  loading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private toastService: ToastService) {
      this.wireFilteredHeroes();
    }

  /** Updates cached heroes and publishes */
  private next(newHeroes: Hero[]): void {
    this.heroes$.next(newHeroes);
    this.heroes = newHeroes;
  }

  // region Commands

  /** Get all heroes from the database. Update heroes$ and loading$ indicator. */
  getHeroes(): void {
    this.loading$.next(true);
    this.http
    .get<Hero[]>(`${api}/heroes/`)
      .pipe(
        tap(results => {
          this.next(results);
          this.toast('Heroes retrieved successfully!', 'GET');
        }),
        catchError(this.handleError),
        finalize(() => this.loading$.next(false))
      )
      .subscribe(); // <--- What if you don't subscribe?
  }

  /** Add hero to the database. Update heroes$. */
  addHero(hero: Hero): void {
    this.loading$.next(true);
    this.http
      .post<Hero>(`${api}/hero/`, hero)
      .pipe(
        // Pessimistic add: after succeeds
        tap(added => {
          this.next(this.heroes.concat(added));
          this.toast(`Hero ${hero.name} added`, 'POST');
        }),
        catchError(this.handleError),
        finalize(() => this.loading$.next(false))
      )
      .subscribe(); // <--- What if you don't subscribe?
  }

  /** Delete hero-by-id from the database. Update heroes$. */
  deleteHero(hero: Hero ): void {
    const id = hero && hero.id;

    // Optimistic delete: before request
    this.next(this.heroes.filter(h => h.id !== id));
    this.toast(`Hero ${hero.name} deleted`, 'DELETE');

    this.http
      .delete(`${api}/hero/${id}`)
      .pipe( catchError(this.handleError) )
      .subscribe(); // <--- What if you don't subscribe?
  }

  /** Update the hero in the database.  Update heroes$. */
  updateHero(updatedHero: Hero): void {
    const id = updatedHero && updatedHero.id;
    this.http
    .put<Hero>(`${api}/hero/${updatedHero.id}`, updatedHero)
      .pipe(
        // Pessimistic update: after succeeds
        tap(updated => {
          this.next(this.heroes.map(h => h.id === id ? updatedHero : h));
          this.toast(`Hero ${updatedHero.name} updated`, 'PUT');
        }),
        catchError(this.handleError)
      )
      .subscribe(); // <--- What if you don't subscribe?
  }

  // endregion Commands

  private handleError(res: HttpErrorResponse) {
    console.error(res.error);
    return new ErrorObservable(res.error || 'Server error');
  }

  private toast(message: string, action: string) {
    this.toastService.openSnackBar(message, action);
  }

  // region wireFilteredHeroes
  wireFilteredHeroes() {
    const filterObserver = new BehaviorSubject<string>('');

    this.filterObserver = {
      filter$: filterObserver.asObservable(),
      setFilter: filterValue => filterObserver.next(filterValue)
    };

    // combineLatest:
    // Update filteredHeroes if EITHER the filter value changes OR heroes change
    this.filteredHeroes$ = this.filterObserver.filter$.pipe(
      combineLatest(this.heroes$, this.filterProjector)
    );
  }

  filterProjector(filterValue: string, entities: Hero[]) {
    const regEx = filterValue ? new RegExp(filterValue, 'i') : undefined;
    return regEx ?
      entities.filter((e: any) => e.name && e.name.match(regEx)) :
      entities;
  }
  // endregion wireFilteredHeroes
}
