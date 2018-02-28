import { Action } from '@ngrx/store';

import { Hero } from '../../core';

// Heroes Action Types
export const LOAD_HEROES = '[Heroes] Load Heroes';
export const LOAD_HEROES_SUCCESS = '[Heroes] Load Heroes Success';
export const LOAD_HEROES_ERROR = '[Heroes] Load Heroes Error';

// Step 1. Add the "ADD" types action here

// export const ADD_HERO = '[Heroes] Add Hero';
// export const ADD_HERO_SUCCESS = '[Heroes] Add Hero Success';
// export const ADD_HERO_ERROR = '[Heroes] Add Hero Error';


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

// export class AddHero implements Action {
//   readonly type = ADD_HERO;
//   constructor(public payload: Hero) { }
// }

// export class AddHeroSuccess implements Action {
//   readonly type = ADD_HERO_SUCCESS;
//   constructor(public payload: Hero) { }
// }

// export class AddHeroError implements Action {
//   readonly type = ADD_HERO_ERROR;
//   constructor(public payload: any) { }
// }


/** Union type of all Hero Action Creator classes */
export type HeroActions =
  LoadHeroes
  | LoadHeroesSuccess
  | LoadHeroesError;


// Step 3. Extend with the "ADD" Action Creator classes

// | AddHero
// | AddHeroSuccess
// | AddHeroError;
