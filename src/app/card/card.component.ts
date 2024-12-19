import { Component, Input, OnInit} from '@angular/core';
import { Card } from '../models/card.model';
import { MatCardModule } from '@angular/material/card';
import {CommonModule} from '@angular/common';




@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})


export class CardComponent {
  //Will be assigned its value later by deck
  @Input() card!: Card;
}
