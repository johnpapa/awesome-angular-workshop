import { createFeatureSelector, Selector, Store } from '@ngrx/store';
import { EntityCacheState, ENTITY_CACHE_NAME } from '../reducers';

export const entityCacheSelector = createFeatureSelector<EntityCacheState>(ENTITY_CACHE_NAME);

interface SelectorMap { [name: string]: Selector<{}, any>; }

export function createSelectors$<T>(store: Store<EntityCacheState>, selectors: {}): T {
  const selectorMap = selectors as any as SelectorMap;
  return <T> Object.keys(selectorMap).reduce((selectors$: any, name) => {
    // strip 'select' prefix from the selector fn name and append `$`
    // Ex: 'selectHeroes' => 'heroes$'
    const name$ = name[6].toLowerCase() + name.substr(7) + '$';
    selectors$[name$] = store.select(selectorMap.name);
  }, {});
}
