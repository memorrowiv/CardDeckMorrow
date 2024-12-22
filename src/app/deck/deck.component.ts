import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CardComponent} from '../card/card.component';

import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';
import { Suit, SUITS } from '../models/suit.model';
import { Rank, RANKS } from '../models/rank.model';


import { trigger, state, style, animate, transition } from '@angular/animations';


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

// Ensures the dealt is built and/or loaded on startup by calling the InitializeDeck function
export class DeckComponent implements OnInit {
  deck!: Deck;
  dealtCards: Card[] = [];
  @Output() dealtCardsChange = new EventEmitter<Card[]>();

  @ViewChildren(CardComponent) cardComponents!: QueryList<CardComponent>;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.initializeDeck();
  }

  // This is what actually load the deck. It checks for a current deck state first
  initializeDeck(cards: Card[] = [], shuffled: boolean = false, dealtCards: Card[] = []) {
  console.log('Initializing Deck:', { cards, shuffled, dealtCards });

  if (cards.length > 0) {
    // If the array of cards is there it will load them
    this.deck = {
      cards,
      remainingCards: cards.length,
      shuffled,
    };
    this.dealtCards = dealtCards;
  } else {
    // Initializes a fresh deck
    const freshDeck: Card[] = [];
    SUITS.forEach((suit: Suit) => {
      RANKS.forEach((rank: Rank) => {
        const imageName = `${rank.value[0]}${suit.value[0]}.png`;
        freshDeck.push({ rank: rank.value, suit, imageUrl: `/images/${imageName}` });
      });
    });

    this.deck = {
      cards: freshDeck,
      remainingCards: freshDeck.length,
      shuffled: false,
    };
    this.dealtCards = [];
  }

  this.dealtCardsChange.emit(this.dealtCards);
}

//Simple function to shuffle cards
  shuffleDeck() {
    this.deck.cards = this.deck.cards.sort(() => Math.random() - 0.5);
    this.deck.shuffled = true;
    this.deck.remainingCards = 52;
    this.dealtCards = [];
    this.dealtCardsChange.emit(this.dealtCards);
  }

  dealCards(number: number) {
  if (number > this.deck.remainingCards) { //Checks to ensure enough cards remain
    alert('Not enough cards left in the deck!');
    return;
  }

  const dealt = this.deck.cards.splice(0, number); //Takes in the number of cards a user wants dealt
  this.dealtCards = [...this.dealtCards, ...dealt];
  this.deck.remainingCards -= number; //Does the math to calculate how many cards remain
  this.dealtCardsChange.emit(this.dealtCards); //Commits the change

  // Manually triggers change detection after the cards are dealt
  this.cdr.detectChanges();

  // Wait for the next Angular change detection cycle to trigger animations
  setTimeout(() => {
  this.cardComponents.toArray().forEach((cardComponent, index) => {
    setTimeout(() => {
      cardComponent.flipState = 'flipped';
    }, index * 100);
  });
  }, 100);  // Delays before starting flip animations
}

  resetDeck() {   //Allows users to reinitialize a deck
    this.initializeDeck();
  }
}
