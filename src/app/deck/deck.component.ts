import { ChangeDetectorRef, Component, OnInit, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';

import { DeckService } from '../services/deck.service';
import { Deck } from '../models/deck.model';
import { Card } from '../models/card.model';
import { createDealCardAnimation, createFlipCardAnimation } from '../models/animation.model';

@Component({
  selector: 'app-deck',
  standalone: true,
  imports: [CommonModule, CardComponent],
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css'],
  animations: [createDealCardAnimation(), createFlipCardAnimation()]
})
export class DeckComponent implements OnInit {
  deck!: Deck;
  dealtCards: Card[] = [];
  @Output() dealtCardsChange = new EventEmitter<Card[]>();

  @ViewChildren(CardComponent) cardComponents!: QueryList<CardComponent>;

  constructor(
    private deckService: DeckService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeDeck();
  }

  initializeDeck(): void {
    this.deck = this.deckService.initializeDeck();
    this.dealtCardsChange.emit(this.dealtCards);
  }

  shuffleDeck(): void {
    this.deck = this.deckService.shuffleDeck(this.deck);
    this.dealtCards = [];
    this.dealtCardsChange.emit(this.dealtCards);
  }

  dealCards(number: number): void {
    try {
      const { dealtCards, remainingDeck } = this.deckService.dealCards(this.deck, number);
      this.dealtCards = [...this.dealtCards, ...dealtCards];
      this.deck = remainingDeck;
      this.dealtCardsChange.emit(this.dealtCards);

      this.cdr.detectChanges();

      setTimeout(() => {
        this.cardComponents.toArray().forEach((cardComponent, index) => {
          setTimeout(() => {
            cardComponent.flipState = 'flipped';
          }, index * 100);
        });
      }, 100);
    } catch (error: any) {
      alert(error.message);
    }
  }

  resetDeck(): void {
    this.initializeDeck();
  }
}
