import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { CardsService } from 'src/app/api/cards.service';
import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/models/card';
import { Movement, ListMovement } from 'src/app/models/movement';
import { FormControl } from '@angular/forms';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'af-movements',
  template: `

<div class="container">
  <mat-form-field appearance="fill">
    <mat-label>Seleziona una carta</mat-label>
    <mat-select [formControl]="cardInput" (selectionChange)="someMethod($event.value)">
      <mat-option *ngFor="let card of cards$ | async"  [value]="card._id">{{card.number}}</mat-option>
    </mat-select>
  </mat-form-field>
</div>






<h2>Saldo : {{balance | currency : 'EUR'}}</h2>





<af-movement
*ngFor="let movement of movements?.data"
[cardId]="selectCardId"
[movementTimeStamp]="movement.timestamp"
[movementType]="movement.type"
[movementAmount]="movement.amount"
[movementTitle]="movement.title"
[movementDescription]="movement.description"
></af-movement>

<button
*ngIf="movements && movements.data.length && movements.data.length < movements.total"
 (click)="loadMovement()" mat-raised-button class="loading">Carica Altro...
</button>





<!-- (onSelectionChange)="selectCardId = card.number" -->
<!--  (onSelectionChange)="change(card,$event)"-->
<!-- -->

  `,
  styles: [`

  .flex{
  display: flex;
  text-align: center;
}


.price{
  margin-left: 10px;
}


.text{
  margin-left: 10px;
}


.description{
  width: 70%;
  display: flex;
  justify-content: center;
  align-items: center;
}


.loading{
  margin-top: 10px;
  width: 100%;
  text-align: center;
}`
  ]
})
export class MovementsComponent  {


public cards$ = new BehaviorSubject<Card[]>([]);

selectedCardId$ = new BehaviorSubject<string>('');

public page$ = new BehaviorSubject<number>(0);


selectedCard$ = combineLatest([this.cards$, this.selectedCardId$]).pipe(
  map(([cards,selectedCardId]) => cards.find(c => c._id === selectedCardId))
);


movements: ListMovement | null = null

selectCardId: string = '';

balance = 0;

private page = 0;

public cardInput = new FormControl('');


  constructor(private cardsService: CardsService) {
    this.cardsService.getAllCards().subscribe(res => {
      console.log(res)
      this.cards$.next(res);
  })
   }


   someMethod(event: string){
     this.selectCardId = event;
     this.page$.next(0);
     this.movements = null;
     this.getMovement();
     this.setBalance();
   }


   loadMovement(){
     this.page$.next(this.page$.value + 1);
     this.getMovement();
   }


   setBalance(){
     /*
     const card = this.cards$.find(c => c._id === this.cardInput.value);
     if(card){
       this.balance = card.amount;
     }
     */

   }

   getMovement(){
       this.cardsService.getCardMovements(this.cardInput.value, 5, this.page * 5 ).subscribe(movements => {
         this.movements?.data
         ? this.movements = {...this.movements, data: [...this.movements.data, ...movements.data]}
         : this.movements = movements;
         console.log('movimenti',movements.data)
         console.log('cardInput',this.cardInput.value)
        })
  }

}
