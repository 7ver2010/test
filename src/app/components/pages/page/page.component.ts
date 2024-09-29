import { Component, Input, ChangeDetectionStrategy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPage } from '@/models';
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
  @ViewChild("container") element?: ElementRef;

  constructor(
    private readonly scrollService: ScrollService,
    private readonly activatedRoute: ActivatedRoute,
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
}
