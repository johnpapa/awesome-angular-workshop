// ngrx-data version
import { Injectable } from '@angular/core';
import {
  EntityCollectionServiceBase,
  EntityCollectionServiceElementsFactory
} from 'ngrx-data';
// Bonus: added IdGeneratorService
import { IdGeneratorService, Villain } from '../core';
import { FilterObserver } from '../shared/filter';

@Injectable()
export class VillainService extends EntityCollectionServiceBase<Villain> {
  filterObserver: FilterObserver;

  constructor(
    serviceElementsFactory: EntityCollectionServiceElementsFactory,
    private idGenerator: IdGeneratorService // Bonus: inject id generator
  ) {
    super('Villain', serviceElementsFactory);

    /** User's filter pattern */
    this.filterObserver = {
      filter$: this.filter$,
      setFilter: this.setFilter.bind(this)
    };
  }

  // BONUS: generate id if missing
  // MUST generate missing id for villain if
  // Villain EntityMetadata is configured for optimistic ADD.
  add(villain: Villain) {
    if (!villain.id) {
      const id = this.idGenerator.nextId();
      villain = { ...villain, id };
    }
    return super.add(villain);
  }
}
