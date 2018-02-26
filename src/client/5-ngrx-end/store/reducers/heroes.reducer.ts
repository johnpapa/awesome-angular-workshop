import { Hero } from '../../core';

// `fromHeroes` is the namespace for the heroes actions
import * as fromHeroes from '../actions/heroes.actions';

// Properties of the Hero Collection in store
export interface HeroesState {
  data: Hero[];
  loaded: boolean;
  loading: boolean;
}

// Initial Heroes Collection values
export const initialHeroesState: HeroesState = {
  data: [],
  loaded: false,
  loading: false
};

/**
 * Reducer for the Heroes Collection (HeroState)
 * @param state The HeroState to update; initial state if not supplied
 * @param action HeroAction to perform.
 * At runtime will be any action dispatched to the store.
 */
export function reducer(
  state = initialHeroesState,
  action: fromHeroes.HeroActions // only interested in the HeroActions.
): HeroesState { // must return HeroState!

  // Every action has a type
  switch (action.type) {

    // Request to load heroes from the database
    // There aren't any heroes yet; but the loading indicator should spin.
    case fromHeroes.LOAD_HEROES: {
      // Always return a new object (immutability principle)
      return {
        ...state,      // the incoming state
        loading: true  // turn loading indicator on
      };
    }

    // :-) YES! The server supplied heroes
    case fromHeroes.LOAD_HEROES_SUCCESS: {
      return {
        ...state,             // the incoming state
        data: action.payload, // heroes from the server
        loaded: true,         // the heroes were loaded
        loading: false,       // turn loading indicator off
      };
    }

    // :-( BOO! The server request failed. No heroes
    case fromHeroes.LOAD_HEROES_ERROR: {
      return {
        ...state,             // the incoming state
        loaded: false,        // no longer in the `loaded` state
        loading: false,       // turn loading indicator off
      };
    }

  // Step 1. Add the ADD cases (only the success case is necessary)

    // Request to add a hero to the database
    case fromHeroes.ADD_HERO: {
      // Pessimistically add upon success. Nothing to do.
      // Do not touch the loading or loaded flags during an ADD
      // You can omit this case.
      return state;
    }

    // :-) YES! The server added the hero, which is in the payload
    case fromHeroes.ADD_HERO_SUCCESS: {
      const added: Hero = action.payload;
      // Do not add if already in the collection.
      return -1 < state.data.findIndex(e => e.id === added.id) ?
        state :
        {
          ...state,
          data: [...state.data, added] // new array w/ added hero on the end
        };
    }

    // :-( BOO! The server request failed to add the hero
    // Nothing to do. Return the state.
    // You can omit this case.
    case fromHeroes.ADD_HERO_ERROR: {
      return state;
    }

    // BONUS: the remaining cases

    // Request to delete a hero from the database by id
    case fromHeroes.DELETE_HERO: {
      const deleteId: number = action.payload;
      // Optimistically remove immediately.
      // If request fails later, too bad. Do nothing.
      return {
        ...state,
        // Create new array of heroes with those that don't match the id.
        data: state.data.filter(h => h.id !== deleteId)
      };
    }

    // Request to update a hero in the database
    case fromHeroes.UPDATE_HERO_SUCCESS: {
      const updated: Hero = action.payload;
      const id: number = updated && updated.id;
      // Pessimistic. Only add the hero on success.
      // If request fails, nothing to undo.
      return {
        ...state,
        // Create new array with previous heroes except for updated,
        // which we use instead of the previous hero.
        data: state.data.map(h => h.id === id ? updated : h)
      };
    }

  }

  // Action wasn't a Heroes Action (at least not one we processed)
  // Always return the original state by default.
  return state;
}
