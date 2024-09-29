import { Injectable } from '@angular/core';

import { Observable, of, Subscriber } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  getBase64(file: File): Observable<string | null> {
    var reader = new FileReader();
    reader.readAsDataURL(file);

    return new Observable((subscriber: Subscriber<ArrayBuffer | string | null>) => {
      reader.onload = () => {
        subscriber.next(reader.result);
      };
    })
    .pipe(
      map(value => {
        if(typeof value === 'string') {
          return value
        }
        return null;
      }),
      catchError(_ => of(null))
    )
 }
}
