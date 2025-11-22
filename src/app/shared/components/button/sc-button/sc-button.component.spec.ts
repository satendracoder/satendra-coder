import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScButtonComponent } from './sc-button.component';

describe('ScButtonComponent', () => {
  let component: ScButtonComponent;
  let fixture: ComponentFixture<ScButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScButtonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
