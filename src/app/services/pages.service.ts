import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { IPage, IPagesDto } from '@models';
import { ApiService } from './api.service';

const MOCK_URL = 'mocks/pictures.json';

@Injectable({
  providedIn: 'root'
})
export class PagesService {

  constructor(private readonly apiService: ApiService) { }

  getPages(): Observable<IPage[]> {
    return this.apiService.get<IPagesDto>(MOCK_URL)
      .pipe(
        map(pictures => pictures.pages),
        shareReplay(1),
      );
  }
}
