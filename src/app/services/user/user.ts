import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, map } from "rxjs";
import { BaseService } from "../../shared/services";
import { API_BASE_URL } from "../../core";

export interface UserBatch {
    _id: string;
    id?: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface User {
    _id: string;
    id?: string;
    email: string;
    roles: string[];
    name: string;
    active: boolean;
    emailVerified: boolean;
    batch: UserBatch;
    phone: string;
    photo: string | null;
    currentPosition: string;
    company: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    // Optional fields that might not be in API response
    firstName?: string;
    lastName?: string;
    graduationYear?: number;
    major?: string;
    bio?: string;
    location?: string;
}

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService<User> {
    private readonly httpClient = inject(HttpClient);
    private readonly apiBaseUrl = inject(API_BASE_URL);

    constructor() {
        super('users');
    }

    /**
     * Get current authenticated user profile
     */
    getCurrentUser(): Observable<User> {
        return this.httpClient.get<User>(`${this.apiBaseUrl}/auth/me`, {
            withCredentials: true
        }).pipe(
            map(response => this.transformResponse(response))
        );
    }

    /**
     * Update current user profile
     */
    updateCurrentUser(userData: Partial<User>): Observable<User> {
        const transformedData = this.transformRequest(userData);
        return this.httpClient.patch<User>(`${this.apiBaseUrl}/users`, transformedData, {
            withCredentials: true
        }).pipe(
            map(response => this.transformResponse(response))
        );
    }

    /**
     * Transform API response by mapping _id to id
     */
    private transformResponse(obj: any): any {
        if (!obj) return obj;

        if (Array.isArray(obj)) {
            return obj.map(item => this.transformResponse(item));
        }

        if (typeof obj === 'object') {
            const transformed: any = { ...obj };

            // Map _id to id if _id exists and id doesn't exist
            if (transformed._id && !transformed.id) {
                transformed.id = transformed._id;
                delete transformed._id;
            }

            // Recursively transform nested objects
            for (const key in transformed) {
                if (transformed[key] && typeof transformed[key] === 'object') {
                    transformed[key] = this.transformResponse(transformed[key]);
                }
            }

            return transformed;
        }

        return obj;
    }

    /**
     * Transform outgoing data by mapping id to _id for API calls
     */
    private transformRequest(obj: any): any {
        if (!obj) return obj;

        if (Array.isArray(obj)) {
            return obj.map(item => this.transformRequest(item));
        }

        if (typeof obj === 'object') {
            const transformed: any = { ...obj };

            // Map id to _id if id exists (for MongoDB compatibility)
            if (transformed.id && typeof transformed.id === 'string') {
                transformed._id = transformed.id;
            }

            // Recursively transform nested objects
            for (const key in transformed) {
                if (transformed[key] && typeof transformed[key] === 'object') {
                    transformed[key] = this.transformRequest(transformed[key]);
                }
            }

            return transformed;
        }

        return obj;
    }
}
