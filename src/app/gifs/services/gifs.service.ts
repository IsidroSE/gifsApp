import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGIFResponse } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'ZAMCU3hLt7Cdq9vrtLmGKipNY7L1tJOi';
  private searchBaseUrl: string = 'https://api.giphy.com/v1/gifs';

  private _historial: string[] = [];

  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial];
  }

  constructor( private http: HttpClient ) {

    this._historial = JSON.parse( localStorage.getItem('historial')!) || [];
    this.resultados = JSON.parse( localStorage.getItem('resultados')!) || [];

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
    localStorage.setItem('historial', JSON.stringify( this._historial ));

    const params = new HttpParams()
      .set('api_key', this.apiKey)
      .set('limit', '10')
      .set('q', query);
    console.log(params);

    this.http.get<SearchGIFResponse>(
      `${ this.searchBaseUrl }/search`, { params }
    )
    .subscribe( (response: any) => {
      console.log(response);
      this.resultados = response.data;
      localStorage.setItem('resultados', JSON.stringify(this.resultados));
    });
  }

}
