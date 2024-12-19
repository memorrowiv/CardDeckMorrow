import { Card } from './card.model';

export interface Deck {
  cards: Card[];
  remainingCards: number;
  shuffled: boolean;
}
