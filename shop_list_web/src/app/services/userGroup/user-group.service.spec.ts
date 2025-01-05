import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserGroupService } from './user-group.service';
import { environment } from '../../environments/environment';
import { InvitationCode } from './interfaces/invitationCode.interface';

describe('UserGroupService', () => {
  let service: UserGroupService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserGroupService]
    });
    service = TestBed.inject(UserGroupService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should update a user group', () => {
    const userGroupId = '1';
    const groupName = 'Updated Group';
  
    service.updateGroup(groupName, userGroupId).subscribe(response => {
      expect(response.status).toBe(200);
    });
  
    const req = httpMock.expectOne(`${environment.api}/api/userGroups/update/${userGroupId}`);
    expect(req.request.method).toBe('PUT');
    req.flush({}, { status: 200, statusText: 'OK' });
  });

  it('should delete a user group', () => {
    const userGroupId = '1';

    service.deleteGroup(userGroupId);

    const req = httpMock.expectOne(`${environment.api}/api/userGroups/delete/${userGroupId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should join a user group', () => {
    const userName = 'testUser';
    const code = 'joinCode';

    service.joinGroup(userName, code).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.api}/api/userGroups/code/join/${userName}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should leave a user group', () => {
    const userName = 'testUser';
    const userGroupId = '1';

    service.leaveGroup(userName, userGroupId).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${environment.api}/api/userGroups/leave/${userName}`);
    expect(req.request.method).toBe('PUT');
    req.flush({});
  });

  it('should get invitation codes for a user', () => {
    const userName = 'testUser';
    const mockInvitationCodes: InvitationCode[] = [{ id: '123', creatorUserId: '456', code: 'code1', userGroupId: '1' }];

    service.getInvitationCodesForUser(userName).subscribe(codes => {
      expect(codes).toEqual(mockInvitationCodes);
    });

    const req = httpMock.expectOne(`${environment.api}/api/userGroups/code/getByUser/${userName}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockInvitationCodes);
  });

  it('should create an invitation code', () => {
    const userName = 'testUser';
    const userGroupId = '1';
    const mockInvitationCode: InvitationCode = { id: '123', creatorUserId: '456', code: 'newCode', userGroupId: '1' };

    service.createInvitationCode(userName, userGroupId).subscribe(code => {
      expect(code).toEqual(mockInvitationCode);
    });

    const req = httpMock.expectOne(`${environment.api}/api/userGroups/code/create`);
    expect(req.request.method).toBe('POST');
    req.flush(mockInvitationCode);
  });
});