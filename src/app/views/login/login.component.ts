import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'af-login',
  template: `

<div class="container">
  <div class="container-card">
    <mat-card>
      <div *ngIf="visibility && this.route.url.startsWith('/login/signIn')">
      <af-sig-in></af-sig-in>
      <br>
      <a href="#" routerLink="/login/register">Crea un nuovo account</a>
      </div>
      <div *ngIf="this.route.url.startsWith('/login/register')">
      <af-register></af-register>
      <br>
      <a  routerLink="/login/signIn">Hai già un account? Accedi</a>
      </div>
      </mat-card>
      </div>
      </div>




    <router-outlet></router-outlet>

  `,
  styles: [`



.container{
  display: flex;
  height: 80vh;
  width: 100%;
  overflow: hidden;
  justify-content: center;
}

.container-card{
  display: flex;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: center;

}




mat-card {
  height: auto;
}






  `
  ]
})
export class LoginComponent implements OnInit {


  visibility = true;

  constructor(public route: Router) { }

  ngOnInit(): void {
  }

}
