import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'ZAMCU3hLt7Cdq9vrtLmGKipNY7L1tJOi';
  private searchBaseUrl: string = 'https://api.giphy.com/v1/gifs/search?api_key=' + this.apiKey + '&limit=10';

  private _historial: string[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

  }

  buscarGifs(query: string) {

    if ( !this._historial.includes(query) ) {
      this._historial.unshift(query);
    }
    else {
      const index = this._historial.indexOf(query, 0);
      if (index > -1) {
        this._historial.splice(index, 1);
        this._historial.unshift(query);
      }
    }

    this._historial = this._historial.splice(0,10);

    this.http.get(
      this.searchBaseUrl + '&q="' + query + '"'
    )
    .subscribe( (response: any) => {
      console.log(response.data);
    });
  }

}
