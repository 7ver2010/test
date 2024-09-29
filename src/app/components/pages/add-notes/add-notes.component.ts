import { Component, HostBinding, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { INote } from '@models';
import { FileService } from '@services';

@Component({
  selector: 'app-add-notes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './add-notes.component.html',
  styleUrl: './add-notes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddNotesComponent {
  @HostBinding('style.top')
  @Input() top?: string;

  @HostBinding('style.left')
  @Input() left?: string;

  @Output() closeAddNote = new EventEmitter<void>();
  @Output() saveNote = new EventEmitter<INote>();

  public textControl = new FormControl<string>('');
  public imageControl = new FormControl<string | null>(null);

  private file?: File;

  constructor(private readonly fileService: FileService) {
  }

  public fileHandle(e: Event): void {
    const element = e.currentTarget as HTMLInputElement;
    let fileList: FileList | null = element.files;

    if (fileList) {
      this.file = fileList[0];
    }
  }

  public closeAddNoteHandler(): void {
    this.closeAddNote.emit();
  }

  public saveAddNoteHandler(): void {
    const note: INote = {text: this.textControl.value, image: null};

    if(this.file) {
      this.fileService.getBase64(this.file).subscribe((data) => {
        note.image = data;
        this.saveNote.emit(note);
        this.closeAddNoteHandler();
      });
    } else {
      this.saveNote.emit(note);
      this.closeAddNoteHandler();
    }
  }
}
