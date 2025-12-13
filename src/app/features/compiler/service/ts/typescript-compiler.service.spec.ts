import { TestBed } from '@angular/core/testing';

import { TypescriptCompilerService } from './typescript-compiler.service';

describe('TypescriptCompilerService', () => {
  let service: TypescriptCompilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TypescriptCompilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
