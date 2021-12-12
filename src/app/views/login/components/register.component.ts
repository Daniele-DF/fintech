import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/api/auth.service';

@Component({
  selector: 'af-register',
  template: `
   <!-- <div class="container">
  <div class="container-card">
    <mat-card> -->
    <div class="container-form">
        <h1 style="text-align: center;" class="h1">Register</h1>
        <form #f="ngForm" (ngSubmit)="submitHandler(f.value)"
        >
          <div class="container-input">
            <!-- email -->
            <mat-form-field appearance="fill">
              <mat-label>Email</mat-label>
              <input matInput [ngModel] type="email" name="email" #emailRef="ngModel" required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$" />
              <mat-error *ngIf="emailRef.errors?.required">
                Email Richiesta
            </mat-error>
            <mat-error *ngIf="emailRef.errors?.pattern">
              Inserire formato mail valido
          </mat-error>
            </mat-form-field>

            <!-- name -->
            <mat-form-field appearance="fill">
              <mat-label>Nome</mat-label>
              <input matInput [ngModel] type="text" name="name" #nameRef="ngModel" required />
              <mat-error *ngIf="nameRef.errors?.required">
                Nome Richiesto
            </mat-error>
            </mat-form-field>

            <!-- cognome -->
            <mat-form-field appearance="fill">
              <mat-label>Cognome</mat-label>
              <input matInput [ngModel] type="text" name="surname" #surnameRef="ngModel" required />
              <mat-error *ngIf="surnameRef.errors?.required">
                Cognome Richiesto
            </mat-error>
            </mat-form-field>


            <!-- password -->
            <mat-form-field appearance="fill">
              <mat-label>Password</mat-label>
              <input matInput [ngModel] [type]="hide ? 'password' : 'text'" name="password" #pswRef="ngModel" required minlength="8" />
              <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
                <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="pswRef.errors?.required">
               Password richiesta
            </mat-error>
            <mat-error  *ngIf="pswRef.errors?.minlength" class="error">
              Il campo deve contenere almeno 8 caratteri
            </mat-error>
            </mat-form-field>
            <!-- confirm password -->
            <mat-form-field appearance="fill" equalFields>
              <mat-label> Ripeti Password :</mat-label>
              <input matInput [ngModel] [type]="hide ? 'password' : 'text'" name="password_confirmation" #password_confirmation="ngModel" required minlength="8" />
              <button mat-icon-button matSuffix (click)="hide = !hide" [attr.aria-label]="'Hide password'" [attr.aria-pressed]="hide">
                <mat-icon>{{hide ? 'visibility_off' : 'visibility'}}</mat-icon>
              </button>
              <mat-error *ngIf="password_confirmation.errors?.required">
               Password richiesta
            </mat-error>
            <mat-error  *ngIf="password_confirmation.errors?.minlength" class="error">
              Il campo deve contenere almeno 8 caratteri
            </mat-error>
            </mat-form-field>

          </div>
          <div class="btn-container">
            <button type="sumbit" mat-raised-button color="primary" style="width: 100%;" [disabled]="f.invalid">Registrati</button>
          </div>
        </form>
      </div>

      {{ message }}

      <!--
    </mat-card>
  </div>
</div>
-->


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
export class RegisterComponent implements OnInit {

  hide = true;
  message: string ='';

  constructor(public route: Router,  private authService: AuthService) { }

  ngOnInit(): void {
  }

  submitHandler(form: any) {
    //controllo se password è uguale a confirm password
   // if (form.controls.password_confirmation.value === form.controls.password.value) {
      console.log(form.value);
      this.authService.register(form).subscribe({
        next: () => {
          this.message = 'Registration successful!';
          this.route.navigateByUrl('/login/signIn')
        },
        error: () => {
          this.message = 'Registration failed';
        }
      })
    }
    }

 // }

