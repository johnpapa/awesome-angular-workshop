import { defer, Observable } from 'rxjs';
import { finalize, map, tap } from 'rxjs/operators';

/** Event emitted when image is animated */
export interface ImgAnimationEvent {
  /** completion time ratio between 0 and 1 */
  t: number;
  /** x pixel position */
  x: number;
  /** y pixel position */
  y: number;
}

/**
 * Observable of animated image as it drops and bounces
 * @param svg The SVG image to which the animated image will be appended.
 * @returns object with data about the most recent frame of the animation
 */
export const addImg = (svg: SVGSVGElement) => defer(() => {
  // Animate the image
  // const elem = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
  // elem.style = 'fill: red; stroke: none;';

  const elem = document.createElementNS('http://www.w3.org/2000/svg', 'image');
  elem.setAttribute('height', '150');
  elem.setAttribute('width', '150');
  elem.setAttributeNS('http://www.w3.org/1999/xlink', 'href', '../../../assets/kitten.jpg');

  svg.appendChild(elem);
  elem.setAttribute('r', '20');

  return animationTime(2000).pipe(
    map(t => ({
      t,
      x: easeLinear(t) * 600,    // width of svg canvas (see mapping.component)
      y: easeOutBounce(t) * 500  // height of svg canvas (see mapping.component)
    })),
    tap(({ x, y }) => {
      // console.log(`x: ${x}, y: ${y}`);

      // For circles
      // elem.setAttribute('x', x.toString());
      // elem.setAttribute('y', (y - 100).toString());

      // For images
      elem.setAttribute('x', x.toString());
      elem.setAttribute('y', (y - 100).toString());
    }),
    finalize(() => elem.remove()),
  ) as Observable<ImgAnimationEvent>;
});

function animationTime(duration = 1000) {
  return new Observable<number>(observer => {
    const start = Date.now();
    let id: number;

    const animate = () => {
      id = requestAnimationFrame(() => {
        const diff = Date.now() - start;
        if (diff < duration) {
          observer.next(diff / duration);
        } else {
          observer.next(1);
          observer.complete();
        }
        animate();
      });
    };

    animate();

    return () => {
      if (id) {
        cancelAnimationFrame(id);
      }
    };
  });
}

function easeOutBounce(pos: number) {
  if ((pos) < (1 / 2.75)) {
    return (7.5625 * pos * pos);
  } else if (pos < (2 / 2.75)) {
    return (7.5625 * (pos -= (1.5 / 2.75)) * pos + 0.75);
  } else if (pos < (2.5 / 2.75)) {
    return (7.5625 * (pos -= (2.25 / 2.75)) * pos + 0.9375);
  } else {
    return (7.5625 * (pos -= (2.625 / 2.75)) * pos + 0.984375);
  }
}

function easeLinear(x:  number) { return x; }
