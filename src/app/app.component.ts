import {AfterViewInit, Component, ViewChild} from '@angular/core';
import { CommonModule} from '@angular/common';
import { DeckComponent} from './deck/deck.component';
import {CardComponent} from './card/card.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { Card } from './models/card.model';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,
    CardComponent,
    DeckComponent,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'CardManagerMorrow';
  numCards: number = 5;

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
      this.deckComponent.dealCards(this.numCards);
    }
  }

  resetDeck(): void {
    if (this.deckComponent) {
      this.deckComponent.resetDeck();
    }
  }

}
