import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HandbooksCardComponent } from './handbooks-card.component';

describe('HandbooksCardComponent', () => {
  let component: HandbooksCardComponent;
  let fixture: ComponentFixture<HandbooksCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HandbooksCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HandbooksCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
