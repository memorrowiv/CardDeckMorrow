import {Suit} from './suit.model';
import {Rank} from './rank.model';

export interface Card {
  suit: Suit;
  rank: Rank['value'];
  imageUrl: string;
}
