import { TestBed } from '@angular/core/testing';

import { PetUploadService } from './pet-upload.service';

describe('PetUploadService', () => {
  let service: PetUploadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PetUploadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
