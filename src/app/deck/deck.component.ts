import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';
import {CommonModule} from '@angular/common';

// Set Card Types here, if we wanted to switch cards to TCG we could so some here
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
const SUITS = ['Hearts', 'Diamonds', 'Spades', 'Clubs']

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
})


export class DeckComponent implements OnInit {
  deck!: Deck;
  dealtCards: Card[] = [];
  @Output() dealtCardsChange = new EventEmitter<Card[]>();

  constructor() {}

  ngOnInit(): void {
    this.initializeDeck();
  }

  initializeDeck() {
    const cards: Card[] = [];
    SUITS.forEach(suit => {
      RANKS.forEach(rank => {
        cards.push({
          rank,
          suit,
          imageUrl: '' //need to generate images
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
    //Check to ensure there are enough cards to deal the requested amount
    if (number > this.deck.remainingCards) {
      alert('Not enough cards left in the deck!');
      return;
    }

    //This is the logic related to actually dealing out the cards based on the requested number
    const dealt = this.deck.cards.splice(0, number);
    this.dealtCards = this.dealtCards.concat(dealt);
    this.deck.remainingCards -= number;
    this.dealtCardsChange.emit(this.dealtCards);
  }

  resetDeck() {
    this.initializeDeck();
  }
}
