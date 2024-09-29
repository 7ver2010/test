import { Component, ChangeDetectionStrategy, OnInit, Renderer2, OnDestroy } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { PagesService, ZoomService, NotesService } from '@services';
import { PageComponent } from './page/page.component';
import { AddNotesComponent } from './add-notes/add-notes.component';
import { IAddNote, INote } from '@/models';
import { NoteComponent } from './note/note.component';

@Component({
  selector: 'app-pages',
  standalone: true,
  imports: [AsyncPipe, PageComponent, AddNotesComponent, NoteComponent],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PagesComponent implements OnInit, OnDestroy {
  pages$ = this.pagesService.getPages();
  notes?: INote[];
  isAddNoteOpen = false;
  addNoteItem?: IAddNote<number>;

  constructor(
    private readonly pagesService: PagesService,
    private readonly notesService: NotesService,
    private readonly zoomService: ZoomService,
    private readonly renderer: Renderer2,
  ) {}

  public ngOnInit(): void {
    this.zoomService.initPageZoomsHandler(this.renderer);
    this.initNotesList();
  }

  public initNotesList(): void {
    this.notes = this.notesService.getNotes();
  }

  public addNote(e: IAddNote<number>): void {
      this.addNoteItem = e;
      this.isAddNoteOpen = true;
  }

  public closeAddNote(): void {
    this.isAddNoteOpen = false;
    this.addNoteItem = undefined;
  }

  public saveNote(note: INote): void {
    if(this.addNoteItem) {
      this.notesService.addNote({
        ...note,
        top: this.addNoteItem.top,
        left: this.addNoteItem.left,
      });
      this.initNotesList();
    }
  }

  public removeNote(note: INote): void {
    this.notesService.removeNote(note)
    this.initNotesList();
  }

  public dragNote(note: INote): void {
    this.notesService.editNote(note)
    this.initNotesList();
  }

  public saveDocument(): void {
    console.log(this.notes);
  }

  public ngOnDestroy(): void {
    this.zoomService.detachListener();
  }
}
