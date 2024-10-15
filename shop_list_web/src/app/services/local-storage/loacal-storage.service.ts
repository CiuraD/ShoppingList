import {Injectable} from "@angular/core";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
    public static TOKEN_KEY = 'token';
    public static USERNAME = 'username';

    private static readonly PREFIX: string = 'shopList';

    constructor() {}

    isTokenSet(): boolean {
        return !!this.get(LocalStorageService.TOKEN_KEY);
    }

    setObject(key: string, value: any): void {
        this.set(key, JSON.stringify(value));
    }

    getObject(key: string): any {
        const value = this.get(key);
        return value ? JSON.parse(value) : null;
    }

    setString(key: string, value: string): void {
        this.set(key, value);
    }

    getString(key: string): string | null {
        return this.get(key);
    }

    unset(key: string): void {
        localStorage.removeItem(this.constructKey(key));
    }

    private set(key: string, value: string): void {
        localStorage.setItem(this.constructKey(key), value);
    }

    private get(key: string): string | null {
        return localStorage.getItem(this.constructKey(key));
    }

    private constructKey(key: string): string {
        return `${LocalStorageService.PREFIX}.${environment.buildTimestamp}.${key}`;
    }
}
