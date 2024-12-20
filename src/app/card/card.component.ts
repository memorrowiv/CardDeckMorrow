import { Component, Input, OnInit } from '@angular/core';
import { Card } from '../models/card.model';

import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
 animations: [
  trigger('dealCard', [
    state('initial', style({ opacity: 0, transform: 'scale(0)' })),
    state('final', style({ opacity: 1, transform: 'scale(1)' })),
    transition('initial => final', [
      animate('0.5s ease-out')
    ]),
  ]),
  trigger('flipCard', [
    state('flipped', style({ transform: 'rotateY(180deg)' })),
    state('unflipped', style({ transform: 'rotateY(0deg)' })),
    transition('unflipped => flipped', [
      animate('0.6s ease-in-out')
    ]),
    transition('flipped => unflipped', [
      animate('0.6s ease-in-out')
    ])
  ])
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
