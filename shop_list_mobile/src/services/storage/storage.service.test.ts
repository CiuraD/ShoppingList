import AsyncStorage from '@react-native-async-storage/async-storage';
import { storageService } from './storage.service';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('storageService', () => {
  const key = 'testKey';
  const value = 'testValue';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should set an item', async () => {
    await storageService.setItem(key, value);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(key, value);
  });

  it('should get an item', async () => {
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(value);
    const result = await storageService.getItem(key);
    expect(result).toBe(value);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith(key);
  });

  it('should remove an item', async () => {
    await storageService.removeItem(key);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith(key);
  });
});
