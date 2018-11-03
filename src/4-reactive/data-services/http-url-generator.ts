import { Injectable } from '@angular/core';
import { Pluralizer } from './pluralizer';

@Injectable({ providedIn: 'root' })
export class HttpUrlGenerator {
  constructor(private pluralizer: Pluralizer) {}

  entityResource(entityName: string, root: string): string {
    root = normalizeRoot(root);
    return `${root}/${entityName}/`.toLowerCase();
  }
  collectionResource(entityName: string, root: string): string {
    root = normalizeRoot(root);
    const entitiesName = this.pluralizer.pluralize(entityName);
    return `${root}/${entitiesName}/`.toLowerCase();
  }
}

/** Remove leading & trailing spaces or slashes */
export function normalizeRoot(root: string) {
  return root.replace(/^[\/\s]+|[\/\s]+$/g, '');
}
