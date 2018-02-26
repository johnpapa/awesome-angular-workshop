import { Action } from '@ngrx/store';

import { Hero } from '../../core';

// Heroes Action Types
export const LOAD_HEROES = '[Heroes] Load Heroes';
export const LOAD_HEROES_SUCCESS = '[Heroes] Load Heroes Success';
export const LOAD_HEROES_ERROR = '[Heroes] Load Heroes Error';

// Action Creators
export class LoadHeroes implements Action {
  readonly type = LOAD_HEROES;
}

export class LoadHeroesSuccess implements Action {
  readonly type = LOAD_HEROES_SUCCESS;
  constructor(public payload: Hero[]) { }
}

export class LoadHeroesError implements Action {
  readonly type = LOAD_HEROES_ERROR;
  constructor(public payload: any) { }
}

export type HeroActions =
  LoadHeroes
  | LoadHeroesSuccess
  | LoadHeroesError;
