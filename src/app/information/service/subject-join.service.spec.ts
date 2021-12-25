import { TestBed } from '@angular/core/testing';

import { SubjectJoinService } from './subject-join.service';

describe('SubjectJoinService', () => {
  let service: SubjectJoinService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubjectJoinService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
