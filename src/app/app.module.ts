import { NgModule } from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CommonModule} from '@angular/common';
import {AppComponent} from './app.component';
import {DeckComponent} from './deck/deck.component';
import {CardComponent} from './card/card.component';

@NgModule({
  declarations: [
    AppComponent,
    DeckComponent,
    CardComponent,
  ],
  imports : [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
