import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { MessageService, Villain } from '../../core';
import { VILLAIN_DETAIL_CONTAINER } from '../villain-detail-container';
import { VillainService } from '../villain.service';

@Component({
  selector: 'aw-villains',
  templateUrl: './villains.component.html',
  styleUrls: ['./villains.component.scss']
})
export class VillainsComponent implements OnInit, OnDestroy {
  private subscription: Subscription;
  selectedVillain: Villain;

  villains: Villain[];
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
    this.selectedVillain = null;
  }

  enableAddMode() {
    this.selectedVillain = <any>{};
    this.router.navigate(['details', 0], { relativeTo: this.route });
  }

  getVillains() {
    this.clear();
    this.villainService
      .getVillains()
      .subscribe(villains => (this.villains = villains));
  }

  onSelect(villain: Villain) {
    this.selectedVillain = villain;
    this.router.navigate(['details', villain.id], { relativeTo: this.route });
  }

  add(villain: Villain) {
    this.villainService
      .addVillain(villain)
      .subscribe(
        addedVillain => (this.villains = this.villains.concat(addedVillain))
      );
  }

  deleteVillain(villain: Villain) {
    this.clear();
    this.villainService
      .deleteVillain(villain)
      .subscribe(
        () => (this.villains = this.villains.filter(h => h.id !== villain.id))
      );
  }

  update(villain: Villain) {
    this.villainService
      .updateVillain(villain)
      .subscribe(
        () =>
          (this.villains = this.villains.map(
            h => (h.id === villain.id ? villain : h)
          ))
      );
  }

  private listenToViewDetailContainer() {
    this.subscription = this.messageService.listen$.subscribe(
      ({ message, sender }) => {
        if (sender === VILLAIN_DETAIL_CONTAINER) {
          if (message.match(/add|update/i)) {
            this.getVillains(); // detail saved a change
          } else if (message.match(/close/i)) {
            // Return here from detail
            // Below is like navigating to "/villains" without hard-coding it.
            this.router.navigate(['./'], { relativeTo: this.route });
            this.clear();
          }
        }
      }
    );
  }
}
