import { TestBed } from '@angular/core/testing';

import { CppWasmService } from './cpp-wasm.service';

describe('CppWasmService', () => {
  let service: CppWasmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CppWasmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
