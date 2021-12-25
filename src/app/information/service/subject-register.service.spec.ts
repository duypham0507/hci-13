import { TestBed } from '@angular/core/testing';

import { SubjectRegisterService } from './subject-register.service';

describe('SubjectRegisterService', () => {
  let service: SubjectRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
