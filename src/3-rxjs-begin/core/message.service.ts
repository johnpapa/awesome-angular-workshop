import { Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { ToastService } from './toast.service';

export class Message {
  constructor(public readonly message?: any, public readonly sender?: string) {}
}

@Injectable({ providedIn: 'root' })
export class MessageService implements OnDestroy {
  private messageRelay = new Subject<Message>();

  /** Observable to listen for messages */
  listen$ = this.messageRelay.asObservable();

  constructor(private toastService: ToastService) {
    this.listen$.subscribe(({ message, sender }) => {
      message = message || '<unspecified message>';
      sender = sender || 'Unknown sender';
      this.toastService.openSnackBar(message, sender);
    });
  }

  /**
   * Send a message
   * @param message Message content
   * @param sender Who sent it.
   */
  send(message: string, sender?: string): void;
  /**
   * Send a message
   * @param message Message object with a message and sender
   */
  send(message: Message): void;
  send(message: Message | string, sender?: string): void {
    if (message && !this.messageRelay.closed) {
      if (typeof message === 'string') {
        message = new Message(message, sender);
      }
      this.messageRelay.next(message);
    }
  }

  ngOnDestroy() {
    // release subscribers with a Complete()
    this.messageRelay.complete();
  }
}
