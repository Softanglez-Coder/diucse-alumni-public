import { HttpClient } from "@angular/common/http";
import { inject, resource, ResourceRef } from "@angular/core";
import { firstValueFrom } from "rxjs";
import { API_BASE_URL } from "../../core";

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
            loader: () => firstValueFrom(this.http.get<T[]>(`${this.baseUrl}/${this.endpoint}`, { params: flattenedParams })),
            defaultValue: [] as T[]
        });
    }

    /**
     * Get a single record by ID
     */
    findOne(id: string | number): ResourceRef<T> {
        return resource<T, unknown>({
            loader: () => firstValueFrom(this.http.get<T>(`${this.baseUrl}/${this.endpoint}/${id}`)),
            defaultValue: {} as T
        });
    }

    /**
     * Create a new record
     */
    create(data: Partial<T>): ResourceRef<T> {
        return resource<T, unknown>({
            loader: () => firstValueFrom(this.http.post<T>(`${this.baseUrl}/${this.endpoint}`, data)),
            defaultValue: {} as T
        });
    }

    /**
     * Update an existing record (full update)
     */
    update(id: string | number, data: Partial<T>): ResourceRef<T> {
        return resource<T, unknown>({
            loader: () => firstValueFrom(this.http.put<T>(`${this.baseUrl}/${this.endpoint}/${id}`, data)),
            defaultValue: {} as T
        });
    }

    /**
     * Partially update an existing record
     */
    patch(id: string | number, data: Partial<T>): ResourceRef<T> {
        return resource<T, unknown>({
            loader: () => firstValueFrom(this.http.patch<T>(`${this.baseUrl}/${this.endpoint}/${id}`, data)),
            defaultValue: {} as T
        });
    }

    /**
     * Delete a record
     */
    delete(id: string | number): ResourceRef<T> {
        return resource<T, unknown>({
            loader: () => firstValueFrom(this.http.delete<T>(`${this.baseUrl}/${this.endpoint}/${id}`)),
            defaultValue: undefined as T
        });
    }
}