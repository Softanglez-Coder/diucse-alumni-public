import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { API_BASE_URL } from '../../core';
import { BaseService } from '../../shared/services';

export enum GalleryCategory {
  EVENTS = 'events',
  ACTIVITIES = 'activities',
  ACHIEVEMENTS = 'achievements',
  GENERAL = 'general',
}

export interface GalleryImage {
  url: string;
  thumbnail?: string;
  caption?: string;
  order: number;
}

export interface Gallery {
  _id: string;
  title: string;
  description?: string;
  category: GalleryCategory;
  images: GalleryImage[];
  date: string;
  isPublished: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class GalleryService extends BaseService<Gallery> {
  private apiBaseUrl: string = inject(API_BASE_URL);
  private httpClient = inject(HttpClient);

  constructor() {
    super('gallery');
  }

  // Get published galleries for public view
  getPublishedGalleries(): Observable<Gallery[]> {
    return this.httpClient
      .get<Gallery[]>(`${this.apiBaseUrl}/gallery/published`)
      .pipe(map((response) => this.transformResponse(response)));
  }

  // Get galleries by category
  getGalleriesByCategory(category: GalleryCategory): Observable<Gallery[]> {
    return this.httpClient
      .get<Gallery[]>(`${this.apiBaseUrl}/gallery/category/${category}`)
      .pipe(map((response) => this.transformResponse(response)));
  }

  // Get gallery by ID
  getGalleryById(id: string): Observable<Gallery> {
    return this.httpClient
      .get<Gallery>(`${this.apiBaseUrl}/gallery/${id}`)
      .pipe(map((response) => this.transformResponse(response)));
  }

  // Get latest galleries (for homepage)
  getLatestGalleries(limit = 6): Observable<Gallery[]> {
    return this.httpClient
      .get<Gallery[]>(`${this.apiBaseUrl}/gallery/published`)
      .pipe(
        map((response) => {
          const galleries = this.transformResponse(response);
          return galleries.slice(0, limit);
        }),
      );
  }

  /**
   * Transform API response to handle different response formats
   */
  private transformResponse(response: any): any {
    if (Array.isArray(response)) {
      return response;
    }
    return response.data || response;
  }
}
