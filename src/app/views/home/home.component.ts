import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'af-home',
  template: `

    <div class="container">
    <h1>
      Welcome {{title}}!
    </h1>
    </div>
  `,
  styles: [`

  .container{
    display:flex;
    justify-content: center;
  }

  h1{
    text-align: center;
  }


  `
  ]
})
export class HomeComponent implements OnInit {

  title="App-Fintech"

  constructor() { }

  ngOnInit(): void {
  }

}
