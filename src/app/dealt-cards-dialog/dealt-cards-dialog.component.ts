import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { Card } from '../models/card.model';

@Component({
  selector: 'app-dealt-cards-dialog',
  standalone: true,
  imports: [CommonModule, MatDialogModule, MatCardModule],
  templateUrl: './dealt-cards-dialog.component.html',
  styleUrls: ['./dealt-cards-dialog.component.css'],
})
export class DealtCardsDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: { dealtCards: Card[] }) {}
}
