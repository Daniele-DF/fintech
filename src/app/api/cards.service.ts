import { Movement, ListMovement } from './../models/movement';
import { CardForm } from 'src/app/models/cardForm';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Card } from '../models/card';



@Injectable({
  providedIn: 'root'
})
export class CardsService {

  url = `${environment.apiUrl}/cards`;

  constructor(private http: HttpClient) { }


  getAllCards(): Observable<Card[]> {
    console.log(this.url)
    return this.http.get<Card[]>(this.url);
  }

  createCard(cardDTO: CardForm): Observable<Card> {
    return this.http.post<Card>(this.url, cardDTO);
  }

  deleteCard(cardId: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.url}/${cardId}`);
  }

  getCardMovements(cardId: string,limit: number, offset: number): Observable<ListMovement> {
    const params: HttpParams = new HttpParams({fromObject: {'limit': 5}})
    return this.http.get<ListMovement>(`${this.url}/${cardId}/movements`,{params});
  }

}
