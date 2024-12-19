import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { CommonModule} from '@angular/common';
import { DeckComponent} from './deck/deck.component';
import {CardComponent} from './card/card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Card } from './models/card.model';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, CardComponent, DeckComponent, MatToolbarModule, MatButtonModule, MatCardModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'CardManagerMorrow';

  @ViewChild(DeckComponent) deckComponent!: DeckComponent;
  dealtCards: Card[] = [];

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.deckComponent?.dealtCardsChange.subscribe(cards => {
      this.dealtCards = cards;
    })
  }

  shuffleDeck(): void{
    if (this.deckComponent) {
      this.deckComponent.shuffleDeck();
    }
  }

  dealCards(): void {
    if (this.deckComponent) {
      this.deckComponent.dealCards(5);
    }
  }

  resetDeck(): void {
    if (this.deckComponent) {
      this.deckComponent.resetDeck();
    }
  }

}
