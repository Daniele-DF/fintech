import { CardsService } from 'src/app/api/cards.service';
import { TruncatePipe } from './../../../utils/truncate.pipe';
import { Component, Input, OnInit } from '@angular/core';
import { Movement } from 'src/app/models/movement';

@Component({
  selector: 'af-movement',
  template: `

<mat-accordion class="example-headers-align" multi>
  <ng-container>
  <mat-expansion-panel (click)="hideToggle = !hideToggle">
    <mat-expansion-panel-header>
      <mat-panel-title>
        <div class="flex">

        <p>[{{ movementTimeStamp | date:'dd/MM/yy'}}]</p>
        <p class="price" [style.color]="movementAmount && movementAmount > 500 ? 'green' : 'red'">€ {{movementAmount}}</p>
        <p class="text">{{movementTitle}}</p>
      </div>
      <div class="description">
        <p *ngIf="hideToggle == false">{{ movementDescription | truncate :15}}</p>
      </div>
      </mat-panel-title>
    </mat-expansion-panel-header>

    <div class="descriptionFull">
      {{ movementDescription }}
  </div>

  </mat-expansion-panel>

</ng-container>
</mat-accordion>

<!--
<button (click)="caricaAltro()"  *ngIf="cardId.length !== 0 || page !== maxPage" mat-raised-button class="loading">
  Carica altro...
</button>
-->



<!-- *ngIf="cardId == movement.cardId"-->

  `,
  styles: [`

.flex{
  display: flex;
  text-align: center;
  z-index: 2;
}

p {
  margin: 0;
}


.price{
  margin-left: 15px;
}


.text{
  margin: auto;
  position: absolute;
  left: 175px;
}


.description{
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: auto;
  z-index: 1;
  position: absolute;
}


.loading{
  margin-top: 10px;
  width: 100%;
  text-align: center;
}

@media screen and (max-width: 900px) {
  .description {
    justify-content: flex-end;
    right: 55px;
  }
}

@media screen and (max-width: 500px) {
  .flex {
    align-items: center;
  }

  .mat-expansion-panel-header{
    min-height: 70px;
    height: auto;
  }

  .text {
    position: inherit;
  }

  .description {
    position: inherit;
  }

  .price {
    margin: 0 10px;
  }
}

  `
  ]
})
export class MovementComponent implements OnInit {

  movements : Movement[] = [];

  @Input() cardId : string = '';
  @Input() movementTimeStamp: number | null = null;
  @Input() movementType: string | null = null;
  @Input() movementAmount: number | null = null;
  @Input() movementTitle: string = '';
  @Input() movementDescription: string = '';


  page = 1;     // pagina iniziale
  pageSize = 5; // max 5 momivmenti per carta
  maxPage = Math.ceil(this.movements.length / this.pageSize);  // 5 * 5



  hideToggle: boolean = false;


  constructor(private cardService: CardsService) {
    //this.cardService.getCardMovements(this.).subscribe(data => {
    //  this.movements = data;
  //  })
  }

  ngOnInit(): void {

  }


  getMovement(){
    this.getMovement()

  }



  caricaAltro(){
    this.page++;
  }

  get pageSlice() {
    console.log('calcolo',this.page * this.pageSize);
    return this.movements.slice(0,this.page * this.pageSize);
  }


}
