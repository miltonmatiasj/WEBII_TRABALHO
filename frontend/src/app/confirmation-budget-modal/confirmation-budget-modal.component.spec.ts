import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationBudgetModalComponent } from './confirmation-budget-modal.component';

describe('ConfirmationBudgetModalComponent', () => {
  let component: ConfirmationBudgetModalComponent;
  let fixture: ComponentFixture<ConfirmationBudgetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmationBudgetModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmationBudgetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
