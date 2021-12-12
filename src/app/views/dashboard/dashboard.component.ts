import { Component, OnInit } from '@angular/core';
import { map, shareReplay } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/api/auth.service';
import { UserStore } from 'src/app/core/auth-cookies/user.store';
import { Router } from '@angular/router';


@Component({
  selector: 'af-dashboard',
  template: `

<mat-sidenav-container class="sidenav-container">
  <mat-sidenav #drawer class="sidenav" fixedInViewport [attr.role]="(isHandset$ | async) ? 'dialog' : 'navigation'">

    <mat-toolbar class="big">
      Menu <button class="close" mat-button (click)="drawer.toggle()">X</button>
    </mat-toolbar>


    <mat-nav-list>


      <a mat-listItem>
        <div class="icon-home"  routerLink="/dashboard/home">
        <mat-icon>home</mat-icon>
        <span class="title-home">Home</span>
        </div>
    </a>




      <a mat-listItem>
        <div class="icon-card" routerLink="/dashboard/cards">
        <mat-icon>credit_card</mat-icon>
        <span class="title-card">Carte</span>
        </div>
    </a>




  <a mat-listItem>
    <div class="icon-movement" routerLink="/dashboard/movements">
    <mat-icon>receipt_long</mat-icon>
    <span class="title-movement">Movimenti</span>
    </div>
</a>



<a mat-listItem>
  <div class="icon-paid"  routerLink="/dashboard/transfer">
  <mat-icon>paid</mat-icon>
  <span class="title-paid">Trasferisci</span>
  </div>
</a>


<a mat-listItem>
  <div class="icon-event" routerLink="/dashboard/appointments">
  <mat-icon>event</mat-icon>
  <span class="title-event">Appuntamenti</span>
  </div>
</a>


<a mat-listItem>
  <div class="icon-summarize"  routerLink="/dashboard/taxes">
  <mat-icon>summarize</mat-icon>
  <span class="title-summarize">Tasse</span>
  </div>
</a>


      <!-- Users -->
      <a mat-list-item>
        <mat-icon>person</mat-icon>
        <div class="user-info" routerLink="/login/signIn">
        <span class="title-name">{{ displayName$ | async }}</span>
        <a style="cursor: pointer;" (click)="logout()">Logout</a>
      </div>

      </a>


    </mat-nav-list>

  </mat-sidenav>



  <mat-sidenav-content>

    <mat-toolbar color="primary">
      <div class="navBar__container">



        <button mat-icon-button class="example-icon center" aria-label="Example icon-button with menu icon"
          (click)="drawer.toggle()" *ngIf="isHandset$ | async">
          <mat-icon>menu</mat-icon>
        </button>
        <div class=containerThree  (click)="drawer.toggle()">
          NgFintech

        </div>
        <div class="containerTwo">
          <!-- nella home (vers. desktop -> no mobile) se non siamo loggati vedo il pulsante login -->
          <!-- nella home (vers. desktop) se siamo loggati vedo la mia mail e il pulsante logout -->
          <button mat-icon-button class="user-log" *ngIf="!(isHandset$ | async)" (click)="logout()"><span
              class="button__profile">{{ displayName$ | async }}
           </span></button>


          <button mat-icon-button *ngIf="!(isHandset$ | async)">
            <span class="button__logout" (click)="logout()")>Logout</span>
          </button>
        </div>
      </div>
    </mat-toolbar>


    <router-outlet></router-outlet>
  </mat-sidenav-content>








  </mat-sidenav-container>




  `,
  styles: [`

.sidenav-container {
  height: 100%;
}

.sidenav {
  width: 200px;
}

.sidenav .mat-toolbar {
  background: inherit;
}

.mat-toolbar.mat-primary {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.navBar__container {
  display: flex;

  width: 100%;
  height: 62px;
  align-items: center;
}

.containerTwo {
  display: flex;
  width: 100%;
  justify-content: flex-end;
  margin-right: 10px;
  align-items: center;
}

.containerThree {
  display: flex;
  align-items: center;
}

::ng-deep .mat-button-ripple {
  border-radius: inherit;
  display: none;
}

.button__logout:hover {
  color: gray;
}

.button__menu:hover {
  color: gray;
}

.button__profile {
  display: flex;
  justify-content: space-around;
}

.button__profile:hover {
  color: gray;
}


p {
  font-size: small;
}

.email-log {
  font-size: medium;
  margin-right: 15px;
  margin-top: 4px;
}

.mat-icon-button {
  font-size: medium;
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  align-content: center;
}

.center {
  justify-content: center !important;
}

.spaceLeft {
  margin-left: 15px;
}

.close.mat-button {
  position: absolute;
  top: 0;
  right: 15px;
  padding: 5px;
  line-height: 14px;
  min-width: auto;
}

.my-home {
  margin-left: 20px;
}

.user-log {
  color: white;
  text-decoration: none;
  margin-right: 50px;
}

.copy {
  margin-top: 20px;
  margin-left: 2%;
}

p {
  margin-left: 5px;
}

.button__profile {
  display: flex;
  justify-content: space-around;
}




.icon-card{
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 15px;
}

.title-card{
  margin-left: 10px;
}


.home{
  display: flex;
}

.icon-home{
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 15px;
}

.title-home{
  margin-left: 10px;
}

.icon-movement{
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 15px;
}

.title-movement{
  margin-left: 10px;
}


.icon-paid{
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 15px;
}

.title-paid{
  margin-left: 10px;
}



.icon-event{
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 15px;
}

.title-event{
  margin-left: 10px;
}


.icon-summarize{
  display: flex;
  justify-content: start;
  align-items: center;
  margin: 15px;
}

.title-summarize{
  margin-left: 10px;
}

.info-user-container{
  display: flex;
  margin-top: 5px;
}

.user-icon{
  display: flex;
  justify-content: start;
  align-items: center;

}

.user-info{
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 10px;
}



  `
  ]
})
export class DashboardComponent implements OnInit {


  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  displayName$ = this.userStore.user$.pipe(
    map(user => user?.displayName)
  );

constructor(private breakpointObserver: BreakpointObserver,  private userStore: UserStore,
  private authService: AuthService, private route: Router) {}



  ngOnInit(): void {
  }



  logout(){
    this.authService.logout();
    this.route.navigateByUrl('/login/signIn');

  }

}
