import { Component, Output, Input, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IPage, IAddNote } from '@/models';
import { ScrollService } from '@/services';

@Component({
  selector: 'app-page',
  standalone: true,
  imports: [],
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageComponent implements AfterViewInit {
  @Input() page?: IPage;
  @Output() addNote =  new EventEmitter<IAddNote<number>>;
  @ViewChild("container") element?: ElementRef;

  constructor(
    private readonly scrollService: ScrollService,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  public ngAfterViewInit(): void {
    if(!this.element) return;
    if(!this.page) return;

    this.scrollService.scrollToElement(
      this.page,
      this.element.nativeElement,
      this.activatedRoute.snapshot.params['id'],
    );
  }

  public addNoteHandler(e: MouseEvent): void {
    this.addNote.emit({left: e.x, top: e.y});
  }
}
