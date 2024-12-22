// deck.service.ts
import { Injectable } from '@angular/core';
import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';
import { Suit, SUITS } from '../models/suit.model';
import { Rank, RANKS } from '../models/rank.model';

@Injectable({
  providedIn: 'root'
})
export class DeckService {
  private deck: Deck = { cards: [], remainingCards: 0, shuffled: false };

  initializeDeck(cards: Card[] = [], shuffled: boolean = false, dealtCards: Card[] = []): Deck {
    // Using ternary operator to get away from if/then
    this.deck = cards.length > 0
      ? this.initializeFromExistingDeck(cards, shuffled)
      : this.initializeFreshDeck();
    return this.deck;
  }

  private initializeFromExistingDeck(cards: Card[], shuffled: boolean): Deck {
    return {
      cards,
      remainingCards: cards.length,
      shuffled
    };
  }

  private initializeFreshDeck(): Deck {
    const freshDeck: Card[] = this.createFreshDeck();
    return {
      cards: freshDeck,
      remainingCards: freshDeck.length,
      shuffled: false
    };
  }

  private createFreshDeck(): Card[] {
    return SUITS.reduce((acc: Card[], suit: Suit) => {
      RANKS.forEach((rank: Rank) => {
        const imageName = `${rank.value[0]}${suit.value[0]}.png`;
        acc.push({ rank: rank.value, suit, imageUrl: `/images/${imageName}` });
      });
      return acc;
    }, []);
  }

  shuffleDeck(deck: Deck): Deck {
    deck.cards = deck.cards.sort(() => Math.random() - 0.5);
    deck.shuffled = true;
    deck.remainingCards = deck.cards.length;
    return deck;
  }

  dealCards(deck: Deck, number: number): { dealtCards: Card[], remainingDeck: Deck } {
    if (number > deck.remainingCards) {
      throw new Error('Not enough cards left in the deck!');
    }

    const dealt = deck.cards.splice(0, number);
    deck.remainingCards -= number;
    return { dealtCards: dealt, remainingDeck: deck };
  }
}
