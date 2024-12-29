import axiosConfig from '../../configs/axios/axiosConfig';
import {userGroup} from './interfaces/userGrup.interface';

export const userGroupService = {
    getUserGroupsForUser: async (username: string): Promise<userGroup[]> => {
        const response = await axiosConfig.get<userGroup[]>(`/api/userGroups/getUserGroupsForUser/${username}`);
        return response.data;
    },

    createGroup: async (username: string, groupName: string): Promise<userGroup> => {
        const response = await axiosConfig.post<userGroup>('/api/userGroups/createGroup', {username, groupName});
        return response.data;
    },

    updateGroup: async (groupName: string, userGroupId: string): Promise<void> => {
        await axiosConfig.put(`/api/userGroups/updateGroup/${userGroupId}`, {groupName});
    },

    deleteGroup: async (userGroupId: string): Promise<void> => {
        await axiosConfig.delete(`/api/userGroups/deleteGroup/${userGroupId}`);
    },

    joinGroup: async (username: string, code: string): Promise<void> => {
        await axiosConfig.put(`/api/userGroups/joinGroup/${username}`, code);
    },

    leaveGroup: async (username: string, userGroupId: string): Promise<void> => {
        await axiosConfig.put(`/api/userGroups/leaveGroup/${username}`, userGroupId);
    },

    getInvitationCodesForUser: async (username: string): Promise<any> => {
        const response = await axiosConfig.get(`/api/userGroups/getInvitationCodesForUser/${username}`);
        return response.data;
    },

    createInvitationCode: async (username: string, userGroupId: string): Promise<any> => {
        const response = await axiosConfig.post('/api/userGroups/createInvitationCode', {username, userGroupId});
        return response.data;
    },
};
