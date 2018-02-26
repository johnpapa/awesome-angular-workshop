export * from './heroes.reducer';

import { ActionReducerMap } from '@ngrx/store';

import * as fromHeroes from './heroes.reducer';

export const ENTITY_CACHE_NAME = 'EntityCache';

// State of all entities:  heroes, villains ...
export interface EntityCacheState {
  hero: fromHeroes.HeroesState;
}

// Map of all entity cache collections, mapped to their reducers
export const reducers: ActionReducerMap<EntityCacheState> = {
  hero: fromHeroes.reducer
};

