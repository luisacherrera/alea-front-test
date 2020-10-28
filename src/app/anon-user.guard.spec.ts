import { TestBed } from '@angular/core/testing';

import { AnonUserGuard } from './anon-user.guard';

describe('AnonUserGuard', () => {
  let guard: AnonUserGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AnonUserGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
