import { Subject } from 'rxjs';

export function play(...args: any[]) {

  const subject = new Subject();

  subject.next('Waiting for data');

  setTimeout(() => {
    subject.next('Got the data');

    // Try these variations.
    // subject.error('BANG!');
    // subject.complete();

  }, 500);

  return subject;
}
