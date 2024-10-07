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

    private getUserGroupsForUser(userName: string): Observable<userGroup[]> {
        return this.http.get<userGroup[]>(`${environment.api}/api/userGroups/getAllForUser/${userName}`);
    }

    private createGroup(userName: string, groupName: string): Observable<userGroup> {
        return this.http.post<userGroup>(`${environment.api}/api/userGroups/create`, {userName, groupName});
    }

    private joinGroup(userName: string, code: InvitationCode): Observable<any> {
        return this.http.put(`${environment.api}/api/userGroups/join/${userName}`, code);
    }

    private getInvitationCodesForUser(userName: string): Observable<InvitationCode[]> {
        return this.http.get<InvitationCode[]>(`${environment.api}/api/userGroups/code/getByUser/${userName}`);
    }

    private createInvitationCode(userName: string, userGroupId: string): Observable<InvitationCode> {
        return this.http.post<InvitationCode>(`${environment.api}/api/userGroups/code/create`, {userName, userGroupId});
    }

}