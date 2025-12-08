import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CppCompilerComponent } from './cpp-compiler.component';

describe('CppCompilerComponent', () => {
  let component: CppCompilerComponent;
  let fixture: ComponentFixture<CppCompilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CppCompilerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CppCompilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
