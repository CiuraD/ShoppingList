import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { environment } from '../../environments/environment';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should get user ID by username', () => {
    const username = 'testUser';
    const mockUserId = '12345';

    service.getUserId(username).subscribe(userId => {
      expect(userId).toEqual(mockUserId);
    });

    const req = httpMock.expectOne(`${environment.api}/api/users/getUserId/${username}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserId);
  });
});