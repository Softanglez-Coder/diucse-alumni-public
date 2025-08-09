import { HttpClient } from "@angular/common/http";
import { inject, resource, ResourceRef } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { map } from "rxjs";
import { API_BASE_URL } from "../../core";

/**
 * BaseService provides a comprehensive CRUD implementation using Angular's Resource API
 * with automatic transformation between MongoDB-style _id and frontend-style id fields.
 *
 * Features:
 * - Automatic _id to id transformation for incoming API responses
 * - Automatic id to _id transformation for outgoing API requests
 * - Full CRUD operations with Angular Resource API
 * - Type safety with TypeScript generics
 * - Error handling and loading states
 */
export class BaseService<T> {
    private baseUrl: string = inject(API_BASE_URL);
    private readonly http = inject(HttpClient);

    constructor(
        protected endpoint: string,
        protected baseUrlOverride?: string
    ) {
        this.baseUrl = baseUrlOverride || this.baseUrl;
    }

    /**
     * Transform API response by mapping _id to id
     */
    private transformObject(obj: any): any {
        if (!obj) return obj;

        try {
            if (Array.isArray(obj)) {
                return obj.map(item => this.transformObject(item));
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
                        transformed[key] = this.transformObject(transformed[key]);
                    }
                }

                return transformed;
            }

            return obj;
        } catch (error) {
            console.warn('Error transforming API response:', error);
            return obj;
        }
    }

    /**
     * Transform outgoing data by mapping id to _id for API calls
     */
    private transformOutgoingData(obj: any): any {
        if (!obj) return obj;

        try {
            if (Array.isArray(obj)) {
                return obj.map(item => this.transformOutgoingData(item));
            }

            if (typeof obj === 'object') {
                const transformed: any = { ...obj };

                // Map id to _id if id exists (for MongoDB compatibility)
                // Only do this if we're sending data that might need _id
                if (transformed.id && typeof transformed.id === 'string') {
                    // Keep both id and _id for maximum compatibility
                    transformed._id = transformed.id;
                }

                // Recursively transform nested objects
                for (const key in transformed) {
                    if (transformed[key] && typeof transformed[key] === 'object') {
                        transformed[key] = this.transformOutgoingData(transformed[key]);
                    }
                }

                return transformed;
            }

            return obj;
        } catch (error) {
            console.warn('Error transforming outgoing data:', error);
            return obj;
        }
    }

    /**
     * Flatten nested objects into dot notation for query parameters
     * Example: { user: { id: 123, profile: { name: 'John' } } }
     * becomes: { 'user.id': '123', 'user.profile.name': 'John' }
     */
    private flattenParams(obj: Record<string, any>, prefix: string = ''): Record<string, string> {
        const flattened: Record<string, string> = {};

        for (const [key, value] of Object.entries(obj)) {
            const newKey = prefix ? `${prefix}.${key}` : key;

            if (value === null || value === undefined) {
                flattened[newKey] = '';
            } else if (typeof value === 'object' && !Array.isArray(value)) {
                // Recursively flatten nested objects
                Object.assign(flattened, this.flattenParams(value, newKey));
            } else if (Array.isArray(value)) {
                // Handle arrays by joining with comma or using indexed notation
                flattened[newKey] = value.join(',');
            } else {
                // Convert primitive values to strings
                flattened[newKey] = String(value);
            }
        }

        return flattened;
    }

    /**
     * Get all records with optional filtering and pagination
     */
    findAll(params?: Record<string, any>): ResourceRef<T[]> {
        const flattenedParams = params ? this.flattenParams(params) : undefined;

        return resource<T[], unknown>({
            loader: () => firstValueFrom(
                this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`, { params: flattenedParams })
                    .pipe(map(response => this.transformObject(response)))
            ),
            defaultValue: [] as T[]
        });
    }

    /**
     * Get a single record by ID
     */
    findOne(id: string | number): ResourceRef<T> {
        return resource<T, unknown>({
            loader: () => firstValueFrom(
                this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`)
                    .pipe(map(response => this.transformObject(response)))
            ),
            defaultValue: {} as T
        });
    }

    /**
     * Create a new record
     */
    create(data: Partial<T>): ResourceRef<T> {
        const transformedData = this.transformOutgoingData(data);
        return resource<T, unknown>({
            loader: () => firstValueFrom(
                this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, transformedData)
                    .pipe(map(response => this.transformObject(response)))
            ),
            defaultValue: {} as T
        });
    }

    /**
     * Update an existing record (full update)
     */
    update(id: string | number, data: Partial<T>): ResourceRef<T> {
        const transformedData = this.transformOutgoingData(data);
        return resource<T, unknown>({
            loader: () => firstValueFrom(
                this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${id}`, transformedData)
                    .pipe(map(response => this.transformObject(response)))
            ),
            defaultValue: {} as T
        });
    }

    /**
     * Partially update an existing record
     */
    patch(id: string | number, data: Partial<T>): ResourceRef<T> {
        const transformedData = this.transformOutgoingData(data);
        return resource<T, unknown>({
            loader: () => firstValueFrom(
                this.http.patch<T>(`${this.baseUrl}/${this.endpoint}/${id}`, transformedData)
                    .pipe(map(response => this.transformObject(response)))
            ),
            defaultValue: {} as T
        });
    }

    /**
     * Delete a record
     */
    delete(id: string | number): ResourceRef<T> {
        return resource<T, unknown>({
            loader: () => firstValueFrom(
                this.http.delete<T>(`${this.baseUrl}/${this.endpoint}/${id}`)
                    .pipe(map(response => this.transformObject(response)))
            ),
            defaultValue: undefined as T
        });
    }
}
