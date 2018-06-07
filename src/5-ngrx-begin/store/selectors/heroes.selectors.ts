import { createSelector, Selector, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Hero } from '../../core';
import { EntityCacheState, HeroesState, initialHeroesState } from '../reducers';
import { entityCacheSelector } from './entity-cache.selectors';

export interface HeroesSelectors {
  selectCollection: Selector<{}, HeroesState>;
  selectHeroes: Selector<{}, Hero[]>;
  selectLoaded: Selector<{}, boolean>;
  selectLoading: Selector<{}, boolean>;
}

export function createHeroesSelectors(): HeroesSelectors {
  const selectCollection = createSelector(
    entityCacheSelector,
    state => (state ? state.hero : initialHeroesState)
  );

  return {
    selectCollection,
    selectHeroes: createSelector(
      selectCollection,
      collection => collection.data
    ),
    selectLoaded: createSelector(
      selectCollection,
      collection => collection.loaded
    ),
    selectLoading: createSelector(
      selectCollection,
      collection => collection.loading
    )
  };
}

export interface HeroesSelectors$ {
  collection$: Observable<HeroesState>;
  heroes$: Observable<Hero[]>;
  loaded$: Observable<boolean>;
  loading$: Observable<boolean>;
}

export function createHeroesSelectors$(
  store: Store<EntityCacheState>
): HeroesSelectors$ {
  const selectors = createHeroesSelectors();
  return {
    collection$: store.select(selectors.selectCollection),
    heroes$: store.select(selectors.selectHeroes),
    loaded$: store.select(selectors.selectLoaded),
    loading$: store.select(selectors.selectLoading)
  };
}
