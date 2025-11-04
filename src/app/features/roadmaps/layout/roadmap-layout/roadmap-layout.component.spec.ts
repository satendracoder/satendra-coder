import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoadmapLayoutComponent } from './roadmap-layout.component';

describe('RoadmapLayoutComponent', () => {
  let component: RoadmapLayoutComponent;
  let fixture: ComponentFixture<RoadmapLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoadmapLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoadmapLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
