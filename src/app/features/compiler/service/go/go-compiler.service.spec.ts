import { TestBed } from '@angular/core/testing';

import { GoCompilerService } from './go-compiler.service';

describe('GoCompilerService', () => {
  let service: GoCompilerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoCompilerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
