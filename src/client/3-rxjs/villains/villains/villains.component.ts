import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs/Subscription';
import { finalize } from 'rxjs/operators';

import { MessageService, Villain } from '../../core';
import { VillainService } from '../villain.service';
import { Router, ActivatedRoute } from '@angular/router';

import { VILLAIN_DETAIL_CONTAINER } from '../villain-detail-container';

@Component({
  selector: 'aw-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.scss']
})
export class VillainsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  addingVillain = false;
  selectedVillain: Villain;

  villains: Villain[];
  loading: boolean;
  constructor(
    private villainService: VillainService,
    private router: Router,
    private route: ActivatedRoute,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.listenToViewDetailContainer();
    this.getVillains();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  clear() {
    this.addingVillain = false;
    this.selectedVillain = null;
  }

  enableAddMode() {
    this.addingVillain = true;
    this.selectedVillain = null;
    this.router.navigate(['details', 0], { relativeTo: this.route });
  }

  getVillains() {
    this.clear();
    this.loading = true;
    this.villainService
      .getVillains()
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(villains => (this.villains = villains));
  }

  onSelect(villain: Villain) {
    this.addingVillain = false;
    this.selectedVillain = villain;
    this.router.navigate(['details', villain.id], { relativeTo: this.route });
  }

  add(villain: Villain) {
    this.loading = true;
    this.villainService
      .addVillain(villain)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(addedVillain => (this.villains = this.villains.concat(addedVillain)));
  }

  deleteVillain(villain: Villain) {
    this.loading = true;
    this.clear();
    this.villainService
      .deleteVillain(villain)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(() => (this.villains = this.villains.filter(h => h.id !== villain.id)));
  }

  update(villain: Villain) {
    this.loading = true;
    this.villainService
      .updateVillain(villain)
      .pipe(finalize(() => (this.loading = false)))
      .subscribe(
        () => (this.villains = this.villains.map(h => (h.id === villain.id ? villain : h)))
      );
  }



  private listenToViewDetailContainer() {
    this.subscription = this.messageService.listen$
    .subscribe(({ message, sender }) => {
      if (sender === VILLAIN_DETAIL_CONTAINER ) {
        if (message.match(/add|update/i)) {
          this.getVillains(); // detail saved a change
        } else if (message.match(/close/i)) {
          // Return here from detail
          // Below is like navigating to "/villains" without hard-coding it.
          this.router.navigate(['./'], { relativeTo: this.route });
          this.clear();
        }
      }
    });
  }
}
