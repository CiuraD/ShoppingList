import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from './loacal-storage.service';
import { environment } from '../../environments/environment';

describe('LocalStorageService', () => {
    let service: LocalStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LocalStorageService);
    });

    it('should return the correct value from localStorage', () => {
        const key = 'testKey';
        const value = 'testValue';
        const constructedKey = `shopList.${environment.buildTimestamp}.${key}`;
        localStorage.setItem(constructedKey, value);

        expect(service['get'](key)).toEqual(value);
    });

    it('should return null when the key does not exist in localStorage', () => {
        const key = 'nonExistentKey';
        expect(service['get'](key)).toBeNull();
    });
});