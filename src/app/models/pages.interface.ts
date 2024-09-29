export interface IPagesDto {
  name: string;
  pages: IPage[];
}

export interface IPage {
  number: number;
  imageUrl: string;
}
