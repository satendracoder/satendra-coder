import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewHandbookComponent } from './view-handbook.component';

describe('ViewHandbookComponent', () => {
  let component: ViewHandbookComponent;
  let fixture: ComponentFixture<ViewHandbookComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewHandbookComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewHandbookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
