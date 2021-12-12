import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'af-sig-in',
  template: `


    <div class="container-form">
        <h1 style="text-align: center;" class="h1">Login</h1>
        <form #f="ngForm" (ngSubmit)="submitHandler(f.value)">
          <div class="container-input">
            <!-- email -->
            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <mat-icon matPrefix color="primary" style="vertical-align: middle; margin-right: 5px;">person
              </mat-icon>
              <input matInput [ngModel] type="email" name="email" #emailRef="ngModel" required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" />
              <mat-error *ngIf="emailRef.errors?.required">
                The email field is required
            </mat-error>
            <mat-error *ngIf="emailRef.errors?.pattern">
              Insert valid email
          </mat-error>
            </mat-form-field>
            <!-- password -->
            <mat-form-field appearance="fill">
              <mat-label>Password</mat-label>
              <mat-icon
              matPrefix
              color="primary"
              style="vertical-align: middle; margin-right: 5px;"
           >lock
           </mat-icon>
              <input matInput [ngModel] [type]="hide ? 'password' : 'text'" name="password" #pswRef="ngModel" required />
              <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
                <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="pswRef.errors?.required">
                The password field is required
            </mat-error>
            </mat-form-field>
          </div>
          <div class="btn-container">
            <button  type="sumbit" mat-raised-button color="primary" style="width: 100%;" [disabled]="f.invalid">Accedi</button>
          </div>
        </form>
      </div>



 {{ message }}

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


.container-form{
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;

}



.container-input{
  margin-top: 0.5rem;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

mat-card {
  height: auto;
}



.btn-container{
    margin-top: 1rem;
    display: flex;
    width: 350px;

}

.h1{
    text-align: center;
    color: blue;
}



  `
  ]
})
export class SigInComponent implements OnInit {

  hide = true;

  message: string = '';

  constructor( private authService: AuthService,public route: Router) { }

  ngOnInit(): void {
  }



  submitHandler(form: any) {
    const { email, password } = form;
    console.log('login', form);
    this.authService.login(email, password).subscribe({
      next: () => {
        this.message = '';
        this.route.navigateByUrl('dashboard');
      },
      error: () => {
        this.message = 'Login failed.';
      }
    })
  }
}
