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
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {initializeApp} from 'firebase/app';
import {getFirestore, Firestore, doc, setDoc, getDoc, collection, addDoc, getDocs} from 'firebase/firestore';
import { environment } from '../environments/environment';
import {DealtCardsDialogComponent} from './dealt-cards-dialog/dealt-cards-dialog.component';
import { trigger, state, style, animate, transition } from '@angular/animations';


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
export class AppComponent implements AfterViewInit {
  title = 'CardManagerMorrow';
  numCards: number = 5;

  @ViewChild(DeckComponent) deckComponent!: DeckComponent;
  dealtCards: Card[] = [];

  private firestore: Firestore;

  constructor(private dialog: MatDialog) {
    const app = initializeApp(environment.firebaseConfig);
    this.firestore = getFirestore(app);
    console.log('Firebase initialized:', app);
  }

  ngOnInit(): void {
    this.loadDeckState();
  }

  ngAfterViewInit(): void {
    this.deckComponent?.dealtCardsChange.subscribe(cards => {
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
      this.deckComponent.dealCards(this.numCards);
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

  private async loadDeckState(): Promise<void> {
    const SUITS = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  try {
    const deckRef = doc(this.firestore, 'decks', 'currentDeck');
    const deckDoc = await getDoc(deckRef);
    if (deckDoc.exists()) {
      const deckState = deckDoc.data();
      console.log('Loaded deck state', deckState);

      if (deckState) {
        const dealtCards: Card[] = deckState['dealtCards'] || [];
        const remainingCount = deckState['remainingCards'] || 0;
        const totalDeck: Card[] = [...dealtCards];

        // Ensure SUITS and RANKS are in scope
        SUITS.forEach((suit) => {
          RANKS.forEach((rank) => {
            const card = { rank, suit, imageUrl: `/images/${rank[0]}${suit[0]}.png` };

            // Explicitly define the type of `d` as Card in the find function
            if (!dealtCards.find((d: Card) => d.rank === card.rank && d.suit === card.suit)) {
              totalDeck.push(card);
            }
          });
        });

        const remainingCards = totalDeck.slice(0, remainingCount);

        this.deckComponent.initializeDeck(remainingCards, deckState['shuffled'], dealtCards);
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
