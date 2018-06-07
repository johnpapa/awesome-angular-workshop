import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, race, take } from 'rxjs/operators';


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
    // no need to unsubscribe because subscribing to self
    this.filter.valueChanges
      .pipe(
        debounceTime(300),      // wait for user to stop typing
        distinctUntilChanged()  // make sure its a new value
      )
      .subscribe(pattern => this.filterObserver.setFilter(pattern));

    // Set the filter to the current value from filterObserver or ''
    // take(1) completes so no need to unsubscribe
    this.filterObserver.filter$.pipe(
      race(of('')), // either the filterObserver is ready or we use ''
      take(1)
    )
    .subscribe(value => this.filter.setValue(value));
  }
}
