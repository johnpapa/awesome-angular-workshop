import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, ReplaySubject, throwError } from 'rxjs';
import { catchError, combineLatest, finalize, tap } from 'rxjs/operators';
import { Hero, ToastService } from '../core';
import { FilterObserver } from '../shared/filter';

const api = '/api';

@Injectable({ providedIn: 'root' })
export class HeroService {
  // service's cache of heroes
  private heroes: Hero[] = []; // simplistic cache of heroes

  // for filtering
  filterObserver: FilterObserver;
  filteredHeroes$: Observable<Hero[]>;
  heroes$ = new BehaviorSubject<Hero[]>([]);

  constructor(private http: HttpClient, private toastService: ToastService) {
    this.wireFilteredHeroes();
  }

  /** Updates cached heroes and push into the observable */
  private next(newHeroes: Hero[]): void {
    this.heroes = newHeroes;
    this.heroes$.next(newHeroes);
  }

  // region Commands

  /** Get all heroes from the database. Update heroes$ . */
  getHeroes(): void {
    this.http
      .get<Hero[]>(`${api}/heroes/`)
      .pipe(
        tap(results => {
          this.next(results);
          this.toast('Heroes retrieved successfully!', 'GET');
        }),
        catchError(this.handleError),
      )
      .subscribe(); // <--- What if you don't subscribe?
  }

  /** Add hero to the database. Update heroes$. */
  addHero(hero: Hero): void {
    this.http
      .post<Hero>(`${api}/hero/`, hero)
      .pipe(
        // Pessimistic add: after succeeds
        tap(added => {
          this.next(this.heroes.concat(added));
          this.toast(`Hero ${hero.name} added`, 'POST');
        }),
        catchError(this.handleError),
      )
      .subscribe(); // <--- What if you don't subscribe?
  }

  /** Delete hero-by-id from the database. Update heroes$. */
  deleteHero(hero: Hero): void {
    const id = hero && hero.id;

    // Optimistic delete: before request
    this.next(this.heroes.filter(h => h.id !== id));
    this.toast(`Hero ${hero.name} deleted`, 'DELETE');

    this.http
      .delete(`${api}/hero/${id}`)
      .pipe(catchError(this.handleError))
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
          this.next(this.heroes.map(h => (h.id === id ? updatedHero : h)));
          this.toast(`Hero ${updatedHero.name} updated`, 'PUT');
        }),
        catchError(this.handleError)
      )
      .subscribe(); // <--- What if you don't subscribe?
  }

  // endregion Commands

  private handleError(res: HttpErrorResponse) {
    console.error(res.error);
    return throwError(res.error || 'Server error');
  }

  private toast(message: string, action: string) {
    this.toastService.openSnackBar(message, action);
  }

  // region wireFilteredHeroes
  wireFilteredHeroes() {
    const filterObserver = new ReplaySubject<string>();

    // What happens when you comment this out? Why? See FilterComponent.
    filterObserver.next('m');

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
    return regEx
      ? entities.filter((e: any) => e.name && e.name.match(regEx))
      : entities;
  }
  // endregion wireFilteredHeroes
}
