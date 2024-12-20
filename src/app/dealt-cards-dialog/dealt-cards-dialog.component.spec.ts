import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealtCardsDialogComponent } from './dealt-cards-dialog.component';

describe('DealtCardsDialogComponent', () => {
  let component: DealtCardsDialogComponent;
  let fixture: ComponentFixture<DealtCardsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DealtCardsDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealtCardsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
