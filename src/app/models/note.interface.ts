import { IAddNote } from "./add-note.interface";

export interface INote extends Partial<IAddNote<number>>{
  id?: string;
  text: string | null;
  image: string | null;
}
