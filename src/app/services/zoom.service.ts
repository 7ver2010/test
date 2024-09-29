import { Injectable, Renderer2, Inject, NgZone } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ZoomService {
  private listener?: () => void;
  constructor(
    @Inject(DOCUMENT) private readonly document: Document,
    private readonly zone: NgZone,
  ) { }

  public initPageZoomsHandler(renderer: Renderer2): void {
     this.zone.runOutsideAngular(() => {
      this.listener = renderer.listen(this.document, 'keydown', e => {

        if(e.keyCode === 187 || e.keyCode === 107) {
          this.zoomIn();
        }

        if(e.keyCode === 189 || e.keyCode === 109) {
          this.zoomOut();
        }
      })
    });
  }

  public detachListener(): void {
    if (this.listener) {
      this.listener();
    }
  }

  private zoomIn(): void {
    const currentZoom = this.getCurrentZoom();
    // @ts-ignore
    this.document.body.style.zoom = `${parseFloat(currentZoom) + 0.1}`;
  }

  private zoomOut(): void {
    const currentZoom = this.getCurrentZoom();
    const currentZoomFloat = parseFloat(currentZoom);
    // @ts-ignore
    this.document.body.style.zoom = `${currentZoomFloat !== 0 ? currentZoomFloat - 0.1 : currentZoomFloat}`;
  }

  private getCurrentZoom(): string {
    // @ts-ignore
    return this.document.body.style.zoom || '1.0';
  }
}
