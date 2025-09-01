import { Injectable, inject } from "@angular/core";
import { BaseService } from "../../shared/services";
import { HttpClient } from "@angular/common/http";
import { firstValueFrom, map } from "rxjs";
import { resource, ResourceRef } from "@angular/core";
import { API_BASE_URL } from "../../core";

export enum BlogStatus {
  DRAFT = 'draft',
  IN_REVIEW = 'in_review',
  PUBLISHED = 'published',
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
}

export interface Blog {
  id: string;
  author: string | User;
  title: string;
  content: string;
  status: BlogStatus;
  createdAt: string;
  updatedAt: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
  slug?: string;
  featured?: boolean;
  publishedDate?: string;
  readTime?: string;
  likes?: number;
  comments?: number;
  views?: number;
}

export interface CreateBlogDto {
  title: string;
  content: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
}

export interface UpdateBlogDto {
  title?: string;
  content?: string;
  excerpt?: string;
  image?: string;
  tags?: string[];
}

@Injectable()
export class BlogService extends BaseService<Blog> {
    private apiBaseUrl: string = inject(API_BASE_URL);
    private httpClient = inject(HttpClient);

    constructor() {
        super('blogs');
    }

    // Get published blogs for public view
    getPublishedBlogs(): ResourceRef<Blog[]> {
        return resource<Blog[], unknown>({
            loader: () => firstValueFrom(
                this.httpClient.get<Blog[]>(`${this.apiBaseUrl}/blogs/published`)
                    .pipe(map(response => this.transformResponse(response)))
            ),
            defaultValue: [] as Blog[]
        });
    }

    // Get latest published blogs (for homepage)
    getLatestBlogs(limit = 4): ResourceRef<Blog[]> {
        return resource<Blog[], unknown>({
            loader: () => firstValueFrom(
                this.httpClient.get<Blog[]>(`${this.apiBaseUrl}/blogs/published`)
                    .pipe(map(response => {
                        const blogs = this.transformResponse(response);
                        return blogs.slice(0, limit);
                    }))
            ),
            defaultValue: [] as Blog[]
        });
    }

    // Get my blogs (authenticated user)
    getMyBlogs(): ResourceRef<Blog[]> {
        return resource<Blog[], unknown>({
            loader: () => firstValueFrom(
                this.httpClient.get<Blog[]>(`${this.apiBaseUrl}/blogs/me`)
                    .pipe(map(response => this.transformResponse(response)))
            ),
            defaultValue: [] as Blog[]
        });
    }

    // Get my blogs by status
    getMyBlogsByStatus(status: BlogStatus): ResourceRef<Blog[]> {
        return resource<Blog[], unknown>({
            loader: () => firstValueFrom(
                this.httpClient.get<Blog[]>(`${this.apiBaseUrl}/blogs/me/status/${status}`)
                    .pipe(map(response => this.transformResponse(response)))
            ),
            defaultValue: [] as Blog[]
        });
    }

    // Get blogs in review (for publishers)
    getBlogsInReview(): ResourceRef<Blog[]> {
        return resource<Blog[], unknown>({
            loader: () => firstValueFrom(
                this.httpClient.get<Blog[]>(`${this.apiBaseUrl}/blogs/in-review`)
                    .pipe(map(response => this.transformResponse(response)))
            ),
            defaultValue: [] as Blog[]
        });
    }

    // Create blog
    createBlog(data: CreateBlogDto): ResourceRef<Blog> {
        return resource<Blog, unknown>({
            loader: () => firstValueFrom(
                this.httpClient.post<Blog>(`${this.apiBaseUrl}/blogs`, data)
                    .pipe(map(response => this.transformResponse(response)))
            ),
            defaultValue: {} as Blog
        });
    }

    // Update blog
    updateBlog(id: string, data: UpdateBlogDto): ResourceRef<Blog> {
        return resource<Blog, unknown>({
            loader: () => firstValueFrom(
                this.httpClient.patch<Blog>(`${this.apiBaseUrl}/blogs/${id}`, data)
                    .pipe(map(response => this.transformResponse(response)))
            ),
            defaultValue: {} as Blog
        });
    }

    // Change blog status
    draftBlog(id: string): ResourceRef<Blog> {
        return resource<Blog, unknown>({
            loader: () => firstValueFrom(
                this.httpClient.patch<Blog>(`${this.apiBaseUrl}/blogs/${id}/draft`, {})
                    .pipe(map(response => this.transformResponse(response)))
            ),
            defaultValue: {} as Blog
        });
    }

    reviewBlog(id: string): ResourceRef<Blog> {
        return resource<Blog, unknown>({
            loader: () => firstValueFrom(
                this.httpClient.patch<Blog>(`${this.apiBaseUrl}/blogs/${id}/review`, {})
                    .pipe(map(response => this.transformResponse(response)))
            ),
            defaultValue: {} as Blog
        });
    }

    publishBlog(id: string): ResourceRef<Blog> {
        return resource<Blog, unknown>({
            loader: () => firstValueFrom(
                this.httpClient.patch<Blog>(`${this.apiBaseUrl}/blogs/${id}/publish`, {})
                    .pipe(map(response => this.transformResponse(response)))
            ),
            defaultValue: {} as Blog
        });
    }

    unpublishBlog(id: string): ResourceRef<Blog> {
        return resource<Blog, unknown>({
            loader: () => firstValueFrom(
                this.httpClient.patch<Blog>(`${this.apiBaseUrl}/blogs/${id}/unpublish`, {})
                    .pipe(map(response => this.transformResponse(response)))
            ),
            defaultValue: {} as Blog
        });
    }

    // Helper method to transform API responses
    private transformResponse(obj: any): any {
        if (!obj) return obj;

        try {
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
        } catch (error) {
            console.warn('Error transforming API response:', error);
            return obj;
        }
    }
}
