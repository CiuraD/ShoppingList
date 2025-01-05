import axiosConfig from '../../configs/axios/axiosConfig';
import {userGroup} from './interfaces/userGrup.interface';

export const userGroupService = {
    getUserGroupsForUser: async (username: string): Promise<userGroup[]> => {
        const response = await axiosConfig.get<userGroup[]>(`userGroups/getAllForUser/${username}`);
        return response.data;
    },

    createGroup: async (username: string, groupName: string): Promise<userGroup> => {
        const response = await axiosConfig.post<userGroup>('userGroups/createGroup', {username, groupName});
        return response.data;
    },

    updateGroup: async (groupName: string, userGroupId: string): Promise<void> => {
        await axiosConfig.put(`userGroups/updateGroup/${userGroupId}`, {groupName});
    },

    deleteGroup: async (userGroupId: string): Promise<void> => {
        await axiosConfig.delete(`userGroups/deleteGroup/${userGroupId}`);
    },

    joinGroup: async (username: string, code: string): Promise<void> => {
        await axiosConfig.put(`userGroups/joinGroup/${username}`, code);
    },

    leaveGroup: async (username: string, userGroupId: string): Promise<void> => {
        await axiosConfig.put(`userGroups/leaveGroup/${username}`, userGroupId);
    },

    getInvitationCodesForUser: async (username: string): Promise<any> => {
        const response = await axiosConfig.get(`userGroups/getInvitationCodesForUser/${username}`);
        return response.data;
    },

    createInvitationCode: async (username: string, userGroupId: string): Promise<any> => {
        const response = await axiosConfig.post('userGroups/createInvitationCode', {username, userGroupId});
        return response.data;
    },
};
