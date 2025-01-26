import axiosConfig from '../../configs/axios/axiosConfig';
import {userGroup} from './interfaces/userGrup.interface';

export const userGroupService = {
    getUserGroupsForUser: async (username: string): Promise<userGroup[]> => {
        const response = await axiosConfig.get<userGroup[]>(`userGroups/getAllForUser/${username}`);
        return response.data;
    },

    createGroup: async (userName: string, groupName: string): Promise<userGroup> => {
        const response = await axiosConfig.post<userGroup>('userGroups/create', {userName, groupName});
        return response.data;
    },

    updateGroup: async (groupName: string, userGroupId: string): Promise<void> => {
        console.log('Updating group:', groupName, userGroupId);
        await axiosConfig.put(`userGroups/update/${userGroupId}`, groupName, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    },

    deleteGroup: async (userGroupId: string): Promise<void> => {
        await axiosConfig.delete(`userGroups/delete/${userGroupId}`);
    },

    joinGroup: async (userName: string, code: string): Promise<void> => {
        await axiosConfig.put(`userGroups/join/${userName}`, code, {
            headers: {
                'Content-Type': 'text/plain',
            },
        });
    },

    leaveGroup: async (userName: string, userGroupId: string): Promise<void> => {
        await axiosConfig.put(`userGroups/leave/${userName}`, userGroupId);
    },

    getInvitationCodesForUser: async (userName: string): Promise<any> => {
        const response = await axiosConfig.get(`userGroups/code/getByUser/${userName}`);
        return response.data;
    },

    createInvitationCode: async (userName: string, userGroupId: string): Promise<any> => {
        const response = await axiosConfig.post('userGroups/code/create', {userName, userGroupId});
        return response.data;
    },
};
