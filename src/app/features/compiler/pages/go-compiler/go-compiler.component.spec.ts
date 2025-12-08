import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoCompilerComponent } from './go-compiler.component';

describe('GoCompilerComponent', () => {
  let component: GoCompilerComponent;
  let fixture: ComponentFixture<GoCompilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GoCompilerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GoCompilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
