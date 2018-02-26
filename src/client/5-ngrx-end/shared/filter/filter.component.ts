import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Subject } from 'rxjs/Subject';
import { Observer } from 'rxjs/Observer';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'aw-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  @Input() filterObserver: Observer<string>;
  @Input() filterPlaceholder: string;
  filter: FormControl = new FormControl();

  clear() {
    this.filter.setValue('');
  }

  ngOnInit() {
    // Set initialize the filter
    this.filter.setValue('');

    this.filter.valueChanges
      .pipe(
        debounceTime(300), distinctUntilChanged())
      // no need to unsubscribe because subscribing to self
      .subscribe(pattern => this.filterObserver.next(pattern));
  }
}
