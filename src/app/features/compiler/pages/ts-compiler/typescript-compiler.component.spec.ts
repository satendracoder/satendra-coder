import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TsCompilerComponent } from './ts-compiler.component';

describe('TsCompilerComponent', () => {
  let component: TsCompilerComponent;
  let fixture: ComponentFixture<TsCompilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TsCompilerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TsCompilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
