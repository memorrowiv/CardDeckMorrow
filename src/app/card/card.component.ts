import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../models/card.model';

import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import {createDealCardAnimation, createFlipCardAnimation} from '../models/animation.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
 animations: [ createDealCardAnimation(),   // Use the function that returns the animation trigger
    createFlipCardAnimation(),   // Use the function that returns the animation trigger
  ]
})

export class CardComponent implements OnInit {
  @Input() card!: Card;
  cardState = 'initial'; // For deal card animation
  flipState = 'unflipped'; // For flip animation

  ngOnInit() {
    setTimeout(() => {
      this.cardState = 'final';
    }, 0);
  }

  flipCard(): void {
    //Set logs throughout for assistance with debugging
  console.log('Before flip:', this.flipState);
  this.flipState = this.flipState === 'unflipped' ? 'flipped' : 'unflipped';
  console.log('After flip:', this.flipState);
  }
}
