import { Action } from '@ngrx/store';

import { Hero } from '../../core';

// Heroes Action Types
export const LOAD_HEROES = '[Heroes] Load Heroes';
export const LOAD_HEROES_SUCCESS = '[Heroes] Load Heroes Success';
export const LOAD_HEROES_ERROR = '[Heroes] Load Heroes Error';

// Step 1. Add the "ADD" action types here

export const ADD_HERO = '[Heroes] Add Hero';
export const ADD_HERO_SUCCESS = '[Heroes] Add Hero Success';
export const ADD_HERO_ERROR = '[Heroes] Add Heroes Error';

// BONUS: the remaining action types
export const DELETE_HERO = '[Heroes] Delete Hero';
export const DELETE_HERO_SUCCESS = '[Heroes] Delete Hero Success';
export const DELETE_HERO_ERROR = '[Heroes] Delete Hero Error';
export const UPDATE_HERO = '[Heroes] Update Hero';
export const UPDATE_HERO_SUCCESS = '[Heroes] Update Hero Success';
export const UPDATE_HERO_ERROR = '[Heroes] Update Hero Error';

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

// Step 2. Add the "ADD" Action Creators here

export class AddHero implements Action {
  readonly type = ADD_HERO;
  constructor(public payload: Hero) { }
}

export class AddHeroSuccess implements Action {
  readonly type = ADD_HERO_SUCCESS;
  constructor(public payload: Hero) { }
}

export class AddHeroError implements Action {
  readonly type = ADD_HERO_ERROR;
  constructor(public payload: any) { }
}

// BONUS: the remaining action creators

export class DeleteHero implements Action {
  readonly type = DELETE_HERO;
  constructor(public payload: number) { }
}

export class DeleteHeroSuccess implements Action {
  readonly type = DELETE_HERO_SUCCESS;
}

export class DeleteHeroError implements Action {
  readonly type = DELETE_HERO_ERROR;
  constructor(public payload: any) { }
}

export class UpdateHero implements Action {
  readonly type = UPDATE_HERO;
  constructor(public payload: Hero) { }
}

export class UpdateHeroSuccess implements Action {
  readonly type = UPDATE_HERO_SUCCESS;
  constructor(public payload: Hero) { }
}

export class UpdateHeroError implements Action {
  readonly type = UPDATE_HERO_ERROR;
  constructor(public payload: any) { }
}

/** Union type of all Hero Action Creator classes */
export type HeroActions =
  LoadHeroes
  | LoadHeroesSuccess
  | LoadHeroesError

// Step 3. Add the "ADD" Action Creator classes

  | AddHero
  | AddHeroSuccess
  | AddHeroError

// BONUS: the remaining action creators

  | DeleteHero
  | DeleteHeroSuccess
  | DeleteHeroError
  | UpdateHero
  | UpdateHeroSuccess
  | UpdateHeroError;
