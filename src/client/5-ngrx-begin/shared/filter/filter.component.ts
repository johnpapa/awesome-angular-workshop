import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Observable } from 'rxjs/Observable';
import { debounceTime, distinctUntilChanged, take } from 'rxjs/operators';

/** FilterComponent binds to a FilterObserver from parent component */
export interface FilterObserver {
  filter$: Observable<string>;
  setFilter(filterValue: string): void;
}

@Component({
  selector: 'aw-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() filterObserver: FilterObserver;
  @Input() filterPlaceholder: string;
  filter: FormControl = new FormControl();

  clear() {
    this.filter.setValue('');
  }

  ngOnInit() {
    // Set the filter to the current value from filterObserver or ''
    // IMPORTANT: filterObserver must emit at least once!
    // take(1) completes so no need to unsubscribe
    this.filterObserver.filter$.pipe(take(1))
      .subscribe(value => this.filter.setValue(value));

    // no need to unsubscribe because subscribing to self
    this.filter.valueChanges
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe(pattern => this.filterObserver.setFilter(pattern));
  }
}
