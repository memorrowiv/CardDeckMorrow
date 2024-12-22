import {AfterViewInit, Component, DestroyRef, inject, ViewChild} from '@angular/core';
import { initializeApp } from 'firebase/app';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';

import { getFirestore, Firestore, doc, setDoc, getDoc, collection, addDoc, getDocs } from 'firebase/firestore';


import { DeckComponent } from './deck/deck.component';
import { CardComponent } from './card/card.component';
import { DealtCardsDialogComponent } from './dealt-cards-dialog/dealt-cards-dialog.component';
import { Card } from './models/card.model';
import {DeckService} from './services/deck.service';
import { environment } from '../environments/environment';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {Suit, SUITS} from './models/suit.model';
import {Rank, RANKS} from './models/rank.model';
import {createDealCardAnimation, createFlipCardAnimation} from './models/animation.model';


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
    FormsModule,
    MatDialogModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [ createDealCardAnimation(),   // Use the function that returns the animation trigger
    createFlipCardAnimation(),   // Use the function that returns the animation trigger
  ]
})
export class AppComponent implements AfterViewInit {
  title = 'CardManagerMorrow';
  numCards: number = 5; //Defaults cards dealt to 5

  @ViewChild(DeckComponent) deckComponent!: DeckComponent;
  dealtCards: Card[] = []; //Makes sure it has the dealtCards array value
  destroyRef = inject(DestroyRef);

  private firestore: Firestore;

  constructor(
    private deckService: DeckService,
    private dialog: MatDialog) {
    const app = initializeApp(environment.firebaseConfig); //Initializes app through firebase
    this.firestore = getFirestore(app);
    console.log('Firebase initialized:', app);
  }

  ngOnInit(): void {
    this.loadDeckState();
  }

  ngAfterViewInit(): void {
    this.deckComponent?.dealtCardsChange.pipe(
      takeUntilDestroyed(this.destroyRef),
    ).subscribe(cards => {
      this.dealtCards = cards;
      this.saveDealtCardsHistory(cards);
    })
  }

  shuffleDeck(): void{
    if (this.deckComponent) {
      this.deckComponent.shuffleDeck();
      this.saveDeckState();
    }
  }

  dealCards(): void {
    if (this.deckComponent) {
      this.deckComponent.dealCards(this.numCards)
      this.saveDeckState();
    }
  }

  resetDeck(): void {
    if (this.deckComponent) {
      this.deckComponent.resetDeck();
      this.saveDeckState();
    }
  }

  private async saveDeckState(): Promise<void>{
    const deckState = {
      remainingCards: this.deckComponent.deck['remainingCards'],
      shuffled: this.deckComponent.deck['shuffled'],
      dealtCards: this.dealtCards,
    };

    try {
      const deckRef = doc(this.firestore, 'decks', 'currentDeck');
      await setDoc(deckRef, deckState); //Stores Deck State
       console.log('Saving deck state to Firestore')
    } catch (error) {
      console.error(error);
    }
  }

  //Runs series of checks to ensure it is properly loading deck state.
  private async loadDeckState(): Promise<void> {
  try {
    const deckRef = doc(this.firestore, 'decks', 'currentDeck');
    const deckDoc = await getDoc(deckRef);
    if (deckDoc.exists()) {
      const deckState = deckDoc.data();
      console.log('Loaded deck state', deckState);

      if (deckState) {
        const dealtCards: Card[] = (deckState['dealtCards'] || []) as Card[];
        const remainingCount: number = deckState['remainingCards'] || 0;
        const totalDeck: Card[] = [...dealtCards];

        SUITS.forEach((suit: Suit) => {
          RANKS.forEach((rank: Rank) => {
            const card: Card = { rank: rank.value, suit, imageUrl: `/images/${rank.value[0]}${(suit as unknown as string)[0]}.png` };

            // Ensure the remaining deck doesn't include cards already dealt
            if (!dealtCards.find((d: Card) => d.rank === card.rank && d.suit === card.suit)) {
              totalDeck.push(card);
            }
          });
        });

        const remainingCards = totalDeck.slice(0, Math.min(remainingCount, totalDeck.length));
        this.deckService.initializeDeck(remainingCards, deckState['shuffled'], dealtCards);
      }
    } else {
      console.log('Deck state not found');
    }
  } catch (error) {
    console.error(error);
  }
}





  private async saveDealtCardsHistory(cards: Card[]): Promise<void> {
    try {
      const historyRef = collection(this.firestore, 'dealtCards');
      await addDoc(historyRef, { cards, timestamp: new Date()});
      console.log('Dealt Cards saved');
    } catch (error) {
      console.error(error);
    }
  }

  //Keeps a running history of all cards dealt
  viewHistory(): void {
    const historyRef = collection(this.firestore, 'dealtCards');
    getDocs(historyRef)
      .then((querySnapshot) => {
        const dealtHistory: Card[] = [];
        querySnapshot.forEach((doc) => {
          const docData = doc.data();

          if (docData && docData['cards']) {
          docData['cards'].forEach((card: any) => {
            dealtHistory.push({
              rank: card.rank,
              suit: card.suit,
              imageUrl: card.imageUrl || `/images/${card.rank[0]}${card.suit[0]}.png`
            });
          });
        } else {
          console.error('No cards found in document:', docData);
        }
      });
        console.log('Dealt Cards:', dealtHistory)

        // Open the dialog with the data
        this.dialog.open(DealtCardsDialogComponent, {
          data: {
            dealtCards: dealtHistory
          }
        });
      })
      .catch((error) => {
        console.error('Error loading dealt history from Firestore:', error);
      });
  }

}
