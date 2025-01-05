import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LocalStorageService } from '../local-storage/loacal-storage.service';
import { environment } from '../../environments/environment';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let localStorageService: jasmine.SpyObj<LocalStorageService>;

  beforeEach(() => {
    const localStorageSpy = jasmine.createSpyObj('LocalStorageService', ['setString', 'unset']);

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        { provide: LocalStorageService, useValue: localStorageSpy }
      ]
    });
    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    localStorageService = TestBed.inject(LocalStorageService) as jasmine.SpyObj<LocalStorageService>;
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should login and store token and username', () => {
    const username = 'testUser';
    const password = 'testPassword';
    const mockResponse = { token: 'testToken' };

    service.login(username, password).subscribe(response => {
      expect(response).toBeNull();
      expect(localStorageService.setString).toHaveBeenCalledWith(LocalStorageService.TOKEN_KEY, mockResponse.token);
      expect(localStorageService.setString).toHaveBeenCalledWith(LocalStorageService.USERNAME, username);
    });

    const req = httpMock.expectOne(`${environment.api}/api/users/login`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should register a new user', () => {
    const username = 'testUser';
    const email = 'test@example.com';
    const password = 'testPassword';
    const mockResponse = { success: true };

    service.register(username, email, password).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`${environment.api}/api/users/register`);
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should logout and clear local storage', () => {
    service.logout();

    expect(localStorageService.unset).toHaveBeenCalledWith(LocalStorageService.TOKEN_KEY);
    expect(localStorageService.unset).toHaveBeenCalledWith(LocalStorageService.USERNAME);
  });
});