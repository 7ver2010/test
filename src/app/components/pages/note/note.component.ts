import { Component, HostBinding, Input, HostListener, SimpleChanges, OnChanges, ChangeDetectionStrategy, Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';

import { INote } from '@models';

@Component({
  selector: 'app-note',
  standalone: true,
  imports: [],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NoteComponent implements OnChanges {
  @HostBinding('style.top') top?: string;
  @HostBinding('style.left') left?: string;

  // TOFIX: Fast realisation. Ideal way would be with runOutsideAngular here and,
  // mouseup listener on main container through the service

  @HostListener('click', ['$event'])
  public click(event: MouseEvent): void {
    event.stopPropagation();
  }

  @HostListener('mousedown', ['$event'])
  public mouseDown(event: MouseEvent): void {
    event.preventDefault();
    this.moveStarted = true;
  }

  @HostListener('mousemove', ['$event'])
  public mouseMove (event: MouseEvent): void {
    event.preventDefault();
    if(this.moveStarted) {
      this.top = this.top
        ? `${parseInt(this.top, 10) + event.movementY}px`
        : this.top

      this.left = this.left
        ? `${parseInt(this.left, 10) + event.movementX}px`
        : this.left
    }
  }

  @HostListener('mouseup', ['$event'])
  public mouseUp(event: MouseEvent): void {
    event.preventDefault();
    if(this.moveStarted && this.top && this.left && this.note) {
      this.drag.emit({
        ...this.note,
        top: parseInt(this.top, 10),
        left: parseInt(this.left, 10),
      });
    }
    this.moveStarted = false;
  }

  @Input() note?: INote;

  @Output() remove = new EventEmitter<INote>();
  @Output() drag = new EventEmitter<INote>();

  @ViewChild('noteEl') element?: ElementRef<HTMLDivElement>;

  private moveStarted = false;

  public ngOnChanges(sc: SimpleChanges): void {
    if(sc['note'] && sc['note'].currentValue) {
      this.top = `${sc['note'].currentValue.top}px`;
      this.left = `${sc['note'].currentValue.left}px`;
    }
  }

  public removeHandler(): void {
    this.remove.emit(this.note);
  }
}
