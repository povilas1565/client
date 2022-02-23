import { TestBed } from '@angular/core/testing';

import { AuthDefenderService } from './auth-defender.service';

describe('AuthDefenderService', () => {
  let service: AuthDefenderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthDefenderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
