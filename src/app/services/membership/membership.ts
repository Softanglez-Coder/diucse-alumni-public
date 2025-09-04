import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, catchError, of } from 'rxjs';
import { BaseService } from '../../shared/services';
import { API_BASE_URL } from '../../core';

export enum MembershipStatus {
  Draft = 'draft',
  Requested = 'requested',
  InProgress = 'in_progress',
  PaymentRequired = 'payment_required',
  Approved = 'approved',
  Rejected = 'rejected',
}

export interface Membership {
  _id: string;
  id?: string;
  user: any; // UserDocument
  status: MembershipStatus;
  justification?: string;
  invoice?: any; // InvoiceDocument
  createdAt: string;
  updatedAt: string;
}

@Injectable({
  providedIn: 'root',
})
export class MembershipService extends BaseService<Membership> {
  private readonly httpClient = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  constructor() {
    super('memberships');
  }

  /**
   * Get current user's membership
   * @returns Observable with the membership details
   */
  getMyMembership(): Observable<Membership | null> {
    return this.httpClient
      .get<Membership>(`${this.apiBaseUrl}/memberships/me`, {
        withCredentials: true,
      })
      .pipe(
        map((response) => (response ? this.transformResponse(response) : null)),
        // Handle 404 or no membership found case
        catchError((error) => {
          if (error.status === 404) {
            return of(null);
          }
          throw error;
        }),
      );
  }

  /**
   * Request membership for the current user
   * @returns Observable with the membership request details
   */
  requestMembership(): Observable<Membership> {
    return this.httpClient
      .post<Membership>(
        `${this.apiBaseUrl}/memberships/request`,
        {},
        {
          withCredentials: true,
        },
      )
      .pipe(map((response) => this.transformResponse(response)));
  }

  /**
   * Get membership request by ID
   * @param id The membership request ID
   * @returns Observable with the membership request details
   */
  getMembershipById(id: string): Observable<Membership> {
    return this.httpClient
      .get<Membership>(`${this.apiBaseUrl}/memberships/${id}`, {
        withCredentials: true,
      })
      .pipe(map((response) => this.transformResponse(response)));
  }

  /**
   * Transform API response by mapping _id to id
   */
  private transformResponse(obj: any): any {
    if (!obj) return obj;

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
  }
}
