/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PostApiService } from './post-api.service';

describe('Service: PostApi', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PostApiService]
    });
  });

  it('should ...', inject([PostApiService], (service: PostApiService) => {
    expect(service).toBeTruthy();
  }));
});
