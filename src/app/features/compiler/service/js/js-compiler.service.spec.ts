import { TestBed } from '@angular/core/testing';

import { JsCompilerService } from './js-compiler.service';

describe('JsCompilerService', () => {
  let service: JsCompilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JsCompilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
