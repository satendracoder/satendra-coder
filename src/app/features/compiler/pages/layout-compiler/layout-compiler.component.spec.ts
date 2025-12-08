import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayoutCompilerComponent } from './layout-compiler.component';

describe('LayoutCompilerComponent', () => {
  let component: LayoutCompilerComponent;
  let fixture: ComponentFixture<LayoutCompilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayoutCompilerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayoutCompilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
