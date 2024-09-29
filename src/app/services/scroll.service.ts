import { Injectable, NgZone } from '@angular/core';

import { IPage } from '@models';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor(
    private readonly zone: NgZone,
  ) {}
  // TOFIX: strange behavior, i use it in afterViewInit but page not ready in this moment
  // after that i have to wait 200ms
  public scrollToElement(page: IPage, element: HTMLElement, id: string): void {
    if(parseInt(id, 10) !== page?.number) return;
    this.zone.runOutsideAngular(() => {
      setTimeout(() => {
        if(element) {
          element.scrollIntoView({ block: "start" });
        }
      }, 200);
    });
  }

  // dont have time for this. Should be a scroll listener that change url page count.
  // IntersectionObserver should be useful for this.
  public handleScroll() {

  }
}
