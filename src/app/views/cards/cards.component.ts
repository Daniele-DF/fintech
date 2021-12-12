import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CardsService } from 'src/app/api/cards.service';
import { Card, CardId } from 'src/app/models/card';
import { CardForm } from 'src/app/models/cardForm';

@Component({
  selector: 'af-cards',
  template: `
 <mat-drawer-container>
  <mat-drawer #drawer mode="side" opened="true" position="end">

<af-card-form
  [drawer]="drawer"
  (addCard)="addCardForm($event)">
</af-card-form>


  </mat-drawer>


<af-card-list
[drawer]="drawer"
[cards]="cards"
(cardId)="showMovements($event)"
(removecardId)="removeCard($event)"
(btnAdd)="btnAddCard()"
>
</af-card-list>



</mat-drawer-container>

  `,
  styles: [`

mat-drawer-container {
  width: 100%; /*occupa tutta la pagina */
  height: 100%; /* occupa tutta la pagina */
  border: 1px solid rgba(0, 0, 0, 0.5);
  /*text-align: center; //centro le scritte e bottone */
}

/*contenuto di sx , visualizzato al click */
mat-drawer {
  width: 50%; //allargo il menu laterale
}




  `
  ]
})
export class CardsComponent implements OnInit {

cards: Card[] = [];




newCards: Card[] =  [];


hiddenCard: boolean = false;




 constructor(private http: HttpClient, public snackBar: MatSnackBar, private cardsService: CardsService, public route: Router) {

  }



 ngOnInit(): void {
   this.getAllCards();
 }

 getAllCards() {
     this.cardsService.getAllCards().subscribe(res => {
     console.log('res',res);
     this.cards = res
   })
 }



 showMovements(cardId: CardId){
   console.log('id',cardId.selectedCardId._id);
   this.route.navigateByUrl(`/dashboard/movements/${cardId.selectedCardId._id}`);
 }




btnAddCard(){
console.log('add');
}

removeCard(cardId: CardId){
 console.log('id',cardId.selectedCardId._id);
 this.cardsService.deleteCard(cardId.selectedCardId?._id).subscribe(
   data => {
    console.log('data',data);
    this.cards = this.cards.filter
    (c =>  c._id !== cardId.selectedCardId._id)
   }
 )
}






addCardForm(form: CardForm){
 console.log('datiCarta@Output',form)
    this.cardsService.createCard(form).subscribe(
      res => this.cards = [...this.cards, res]
    )

}
}
