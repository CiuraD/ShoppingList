import axiosConfig from '../../configs/axios/axiosConfig';
import {userGroupService} from './userGroup.service';
import { userGroup } from './interfaces/userGroup.interface';

jest.mock('../../configs/axios/axiosConfig');

describe('userGroupService', () => {
    const mockUsername = 'testUser';
    const mockGroupName = 'testGroup';
    const mockUserGroup: userGroup = { id: 1, name: 'testGroup', members: ['testUser'] };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should create a group', async () => {
        (axiosConfig.post as jest.Mock).mockResolvedValue({ data: mockUserGroup });
        const result = await userGroupService.createGroup(mockUsername, mockGroupName);
        expect(result).toEqual(mockUserGroup);
        expect(axiosConfig.post).toHaveBeenCalledWith('userGroups/createGroup', { username: mockUsername, groupName: mockGroupName });
    });
});
