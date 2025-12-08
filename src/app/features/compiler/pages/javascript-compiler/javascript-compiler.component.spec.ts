import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JavascriptCompilerComponent } from './javascript-compiler.component';

describe('JavascriptCompilerComponent', () => {
  let component: JavascriptCompilerComponent;
  let fixture: ComponentFixture<JavascriptCompilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JavascriptCompilerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JavascriptCompilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
