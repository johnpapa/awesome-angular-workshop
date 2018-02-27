// ngrx-data version
import { Injectable } from '@angular/core';
import { EntityServiceBase, EntityServiceFactory } from 'ngrx-data';

// Bonus: added IdGeneratorService
import { Villain, IdGeneratorService, ToastService } from '../core';
import { FilterObserver } from '../shared/filter';

@Injectable()
export class VillainsService extends EntityServiceBase<Villain> {

  filterObserver: FilterObserver;

  constructor(
    entityServiceFactory: EntityServiceFactory,
    private idGenerator: IdGeneratorService, // Bonus: inject id generator
    private toastService: ToastService) {
    super('Villain', entityServiceFactory);

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
    super.add(villain);
  }
}
