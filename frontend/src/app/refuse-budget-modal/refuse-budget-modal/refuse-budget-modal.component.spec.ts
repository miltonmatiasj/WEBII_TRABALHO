import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RefuseBudgetModalComponent } from './refuse-budget-modal.component';

describe('RefuseBudgetModalComponent', () => {
  let component: RefuseBudgetModalComponent;
  let fixture: ComponentFixture<RefuseBudgetModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RefuseBudgetModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RefuseBudgetModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
