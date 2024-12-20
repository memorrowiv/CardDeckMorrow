import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';
import { CommonModule } from '@angular/common';
import {CardComponent} from '../card/card.component';
import { trigger, state, style, animate, transition } from '@angular/animations';


const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const SUITS = ['Hearts', 'Diamonds', 'Spades', 'Clubs'];

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
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
export class DeckComponent implements OnInit {
  deck!: Deck;
  dealtCards: Card[] = [];
  @Output() dealtCardsChange = new EventEmitter<Card[]>();

  @ViewChildren(CardComponent) cardComponents!: QueryList<CardComponent>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeDeck();
  }

  initializeDeck() {
    const cards: Card[] = [];
    SUITS.forEach(suit => {
      RANKS.forEach(rank => {
        const imageName = `${rank[0]}${suit[0]}.png`;
        cards.push({
          rank,
          suit,
          imageUrl: `/images/${imageName}`
        });
      });
    });

    this.deck = { cards, remainingCards: 52, shuffled: false };
    this.dealtCards = [];
    this.dealtCardsChange.emit(this.dealtCards);
  }

  shuffleDeck() {
    this.deck.cards = this.deck.cards.sort(() => Math.random() - 0.5);
    this.deck.shuffled = true;
    this.deck.remainingCards = 52;
    this.dealtCards = [];
    this.dealtCardsChange.emit(this.dealtCards);
  }

  dealCards(number: number) {
  if (number > this.deck.remainingCards) {
    alert('Not enough cards left in the deck!');
    return;
  }

  const dealt = this.deck.cards.splice(0, number);
  this.dealtCards = [...this.dealtCards, ...dealt];
  this.deck.remainingCards -= number;
  this.dealtCardsChange.emit(this.dealtCards);

  // Manually trigger change detection after the cards are dealt
  this.cdr.detectChanges();

  // Wait for the next Angular change detection cycle to trigger animations
  setTimeout(() => {
  this.cardComponents.toArray().forEach((cardComponent, index) => {
    setTimeout(() => {
      cardComponent.flipState = 'flipped';  // Manually trigger the flip state
    }, index * 100);  // Delay the flip for each card
  });
  }, 100);  // Delay before starting flip animations
}

  resetDeck() {
    this.initializeDeck();
  }
}
