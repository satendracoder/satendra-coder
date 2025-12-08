import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PythonCompilerComponent } from './python-compiler.component';

describe('PythonCompilerComponent', () => {
  let component: PythonCompilerComponent;
  let fixture: ComponentFixture<PythonCompilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PythonCompilerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PythonCompilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
