import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/internal/operators/map';
import { startWith } from 'rxjs/internal/operators/startWith';
import { TaxesService } from 'src/app/api/taxes.service';

@Component({
  selector: 'af-taxes',
  template: `
    <p>
      taxes works!
    </p>
  `,
  styles: [
  ]
})
export class TaxesComponent  {



}
