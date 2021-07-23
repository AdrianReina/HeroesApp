import { Component, Input, OnInit } from '@angular/core';
import { Heroe } from '../../interfaces/heroes.interface';

@Component({
  selector: 'app-heroes-tarjeta',
  templateUrl: './heroes-tarjeta.component.html',
  styles: [
    `
      mat-card {
        margin-top: 20px;
      }
    `,
  ],
})
export class HeroesTarjetaComponent implements OnInit {
  @Input() heroe!: Heroe;

  constructor() {}

  ngOnInit(): void {}
}
