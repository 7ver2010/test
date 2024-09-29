import { Injectable } from '@angular/core';

import { INote } from '@models';
import { HelperService } from './helper.service';

const LS_NOTES_KEY = 'APP_NOTES';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private readonly helperService: HelperService) { }

  public getNotes(): INote[] {
    const notesList = localStorage.getItem(LS_NOTES_KEY);
    if(notesList) {
      try {
        return this.parseBooks(notesList);
      } catch(err) {
        return [];
      }
    }

    return [];
  }

  public addNote(note: INote): boolean {
    const notes = this.getNotes();
    notes.push({...note, id: this.helperService.makeid()});
    try {
      localStorage.setItem(LS_NOTES_KEY, this.serializeBooks(notes));
      return true;
    } catch(err) {
      return false;
    }
  }

  public editNote(note: INote): boolean {
    const notes = this.getNotes();
    const newNotes = notes.map(item => {
      return item.id === note.id ? note : item;
    })

    try {
      localStorage.setItem(LS_NOTES_KEY, this.serializeBooks(newNotes));
      return true;
    } catch(err) {
      return false;
    }
  }

  public removeNote(note: INote): boolean {
    const notes = this.getNotes();
    const filteredNotes = notes.filter(item => note.id !== item.id);
    try {
      localStorage.setItem(LS_NOTES_KEY, this.serializeBooks(filteredNotes));
      return true;
    } catch(error) {
      return false;
    }
  }

  private parseBooks(stringifiedBook: string): INote[] {
    return JSON.parse(stringifiedBook);
  }

  private serializeBooks(books: INote[]): string {
    return JSON.stringify(books);
  }
}
