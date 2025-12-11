import { Injectable, inject } from '@angular/core';
import { Blog } from '../../shared';
import { BaseService } from '../../shared/services';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_BASE_URL } from '../../core';

@Injectable({
  providedIn: 'root',
})
export class BlogService extends BaseService<Blog> {
  private apiBaseUrl: string = inject(API_BASE_URL);
  private httpClient = inject(HttpClient);

  constructor() {
    super('blogs');
  }

  // Get published blogs for public view
  getPublishedBlogs(): Observable<Blog[]> {
    return this.httpClient
      .get<Blog[]>(`${this.apiBaseUrl}/blogs/published`)
      .pipe(map((response) => this.transformResponse(response)));
  }

  // Get latest published blogs (for homepage)
  getLatestBlogs(limit = 4): Observable<Blog[]> {
    return this.httpClient
      .get<Blog[]>(`${this.apiBaseUrl}/blogs/published`)
      .pipe(
        map((response) => {
          const blogs = this.transformResponse(response);
          return blogs.slice(0, limit);
        }),
      );
  }

  // Get my blogs (authenticated user)
  getMyBlogs(): Observable<Blog[]> {
    return this.httpClient
      .get<Blog[]>(`${this.apiBaseUrl}/blogs/me`)
      .pipe(map((response) => this.transformResponse(response)));
  }

  // Get blog by ID
  getBlogById(id: string): Observable<Blog> {
    return this.httpClient
      .get<Blog>(`${this.apiBaseUrl}/blogs/${id}`)
      .pipe(map((response) => this.transformResponse(response)));
  }

  // Create blog
  createBlog(data: Blog): Observable<Blog> {
    return this.httpClient
      .post<Blog>(`${this.apiBaseUrl}/blogs`, data)
      .pipe(map((response) => this.transformResponse(response)));
  }

  // Update blog
  updateBlog(id: string, data: Blog): Observable<Blog> {
    return this.httpClient
      .patch<Blog>(`${this.apiBaseUrl}/blogs/${id}`, data)
      .pipe(map((response) => this.transformResponse(response)));
  }

  // Change blog status
  draftBlog(id: string): Observable<Blog> {
    return this.httpClient
      .patch<Blog>(`${this.apiBaseUrl}/blogs/${id}/draft`, {})
      .pipe(map((response) => this.transformResponse(response)));
  }

  reviewBlog(id: string): Observable<Blog> {
    return this.httpClient
      .patch<Blog>(`${this.apiBaseUrl}/blogs/${id}/review`, {})
      .pipe(map((response) => this.transformResponse(response)));
  }

  // Helper method to transform API responses
  private transformResponse(obj: any): any {
    if (!obj) return obj;

    try {
      if (Array.isArray(obj)) {
        return obj.map((item) => this.transformResponse(item));
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
