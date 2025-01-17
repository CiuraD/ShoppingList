import {HttpClient, HttpResponse} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {userGroup} from "./interfaces/userGrup.interface";
import {InvitationCode} from "./interfaces/invitationCode.interface";

@Injectable({
    providedIn: 'root'
})
export class UserGroupService {
    constructor(
        private http: HttpClient,
    ) {}

    getUserGroupsForUser(userName: string): Observable<userGroup[]> {
        return this.http.get<userGroup[]>(`${environment.api}/api/userGroups/getAllForUser/${userName}`);
    }

    createGroup(userName: string, groupName: string): Observable<userGroup> {
        return this.http.post<userGroup>(`${environment.api}/api/userGroups/create`, {userName, groupName});
    }

    updateGroup(groupName: string, groupId: string): Observable<HttpResponse<any>> {
        return this.http.put(`${environment.api}/api/userGroups/update/${groupId}`, {groupName}, {observe: 'response'});
    }

    deleteGroup(groupId: string): void {
        this.http.delete(`${environment.api}/api/userGroups/delete/${groupId}`).subscribe();
    }

    joinGroup(userName: string, code: string): Observable<any> {
        return this.http.put(`${environment.api}/api/userGroups/code/join/${userName}`, code);
    }

    leaveGroup(userName: string, groupId: string): Observable<any> {
        return this.http.put(`${environment.api}/api/userGroups/leave/${userName}`, groupId);
    }

    getInvitationCodesForUser(userName: string): Observable<InvitationCode[]> {
        return this.http.get<InvitationCode[]>(`${environment.api}/api/userGroups/code/getByUser/${userName}`);
    }

    createInvitationCode(userName: string, userGroupId: string): Observable<InvitationCode> {
        return this.http.post<InvitationCode>(`${environment.api}/api/userGroups/code/create`, {userName, userGroupId});
    }

}