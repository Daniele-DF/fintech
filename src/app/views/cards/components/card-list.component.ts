import { BreakpointObserver, BreakpointState } from '@angular/cdk/layout';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';
import { Card, CardId } from 'src/app/models/card';

@Component({
  selector: 'af-card-list',
  template: `
  <mat-card class="container">

<div class="card-title">
  <h3>Carte</h3>
</div>

<ng-container>
<div class="card-content" *ngFor="let card of cards" [ngClass]="{'fa-card': card._id === selectedCard?._id}"
  (click)="selectedCard = card">

  <div class="icon-card">
    <mat-icon>credit_card</mat-icon>
  </div>

  <div class="card-info-container">

    <div class="card-number">
      <span>{{card.number}}</span>
    </div>

    <div class="card-info">
      <span class="amount"><b>€{{card.amount}}</b> -</span>
      <span class="type"> {{card.type}}</span>
    </div>

  </div>


  <div class="btn-movement">
    <mat-icon matTooltip="Vedi movimenti" (click)="cardId.emit({selectedCardId: card})">
      receipt_long
    </mat-icon>
  </div>
  <div class="btn-delete">
    <mat-icon matTooltip="Rimuovi" (click)="removecardId.emit({selectedCardId: card})">
      delete
    </mat-icon>
  </div>
</div>
</ng-container>
<br>
<div class="btn-add">
  <button (click)="drawer?.toggle()"  mat-raised-button class="btn" (click)="btnAdd.emit()">Aggiungi</button>
</div>

<hr>


</mat-card>








<br>
<br>
<br>

  `,
  styles: [`
  .container{
  display: flex;
  margin: 20px;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 10px;

}

.btn{
  width: 100%;
}



.card-content{
  display: flex;
  width: 100%;
  margin-bottom: 15px;
}

.icon-card{
  display: flex;
  align-items: center;
  margin-right: 20px;
}

.card-info-container{
  display: flex;
  flex-direction: column;
  width: 100%;
}

.card-info{
  display: flex;
}

.type{
  margin-left: 5px;
}


.btn-delete{
  margin-left: 10px;
}


.fa-card{
  background-color: lightblue;
  border-radius: 10px;
}



.btn-delete, .btn-movement{
  display: flex;
  justify-content: center;
  align-items: center;
}


@media screen and (max-width: 800px) {
  mat-drawer-content {
    margin-right: 0px !important;
  }
}
  `
  ]
})
export class CardListComponent implements OnInit {

  showAddCard: Boolean = false;
  activeState: Boolean = false;
  clickState: Boolean = false;
  selectedCard: Card | null = null;


  @Input() cards: Card[] = [];

  @Input() drawer: MatDrawer | undefined;


  @Output() cardId = new EventEmitter<CardId>();
  @Output() removecardId = new EventEmitter<CardId>();
  @Output() btnAdd = new EventEmitter<void>();

  constructor(public breakpointObserver: BreakpointObserver) { }

  onClickButton() {
    this.clickState = !this.clickState;
    this.showAddCard = !this.showAddCard;
  }

  ngOnInit(): void {
    this.breakpointObserver
      .observe(['(max-width: 500px)'])
      .subscribe((state: BreakpointState) => {
        if(state.matches) {
          this.showAddCard = true;
          this.activeState = true;
        } else {
          this.showAddCard = false;
          this.activeState = false;
        }
      })
  }

}
