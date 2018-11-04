// RxJS core objects and Observable creators
import { Observable } from 'rxjs';
import { scan } from 'rxjs/operators';
import { BusService, Message } from './bus.service';

export abstract class ColorComponent {

    abstract color: string;

    messages$: Observable<string[]>;

    constructor(private bus: BusService) {

      /** Messages displayed by this component */
      this.messages$ = bus.messages$.pipe(

        // Interpret messages ... with RxJS scan
        scan((messages: string[], m: Message) => {

          // Clear own messages list if type is "clear" and either no sender or self-sender
          if (m.type === 'clear' && (!m.sender || m.sender === this.color)) {
            return [];

          // Do nothing if this component is the sender
          } else if (m.sender === this.color) {
            return messages;

          // Else add the message from someone else to the messages list
          } else {
            return messages.concat(m.payload as string);
          }
        },
        [] as string[]), // initializer
      );
    }



    send() {
      this.bus.send({
        type: 'hello',
        sender: this.color,
        payload: 'Hello from ' + this.color
      });
    }

    clear() {
      this.bus.send({
        type: 'clear',
        sender: this.color
      });
    }
  }
