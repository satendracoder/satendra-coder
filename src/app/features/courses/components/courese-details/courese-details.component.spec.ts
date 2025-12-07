import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoureseDetailsComponent } from './courese-details.component';

describe('CoureseDetailsComponent', () => {
  let component: CoureseDetailsComponent;
  let fixture: ComponentFixture<CoureseDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CoureseDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoureseDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
