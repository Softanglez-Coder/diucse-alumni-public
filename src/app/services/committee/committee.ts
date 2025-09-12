import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { BaseService } from '../../shared/services';
import { API_BASE_URL } from '../../core';

export interface Committee {
  _id: string;
  id?: string;
  name: string;
  startDate: string;
  endDate: string;
  isPublished: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommitteeDesignation {
  _id: string;
  id?: string;
  name: string;
  order: number;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CommitteeMember {
  _id: string;
  id?: string;
  committeeId: string;
  designationId: string | {
    _id: string;
    name: string;
    description?: string;
    committeeId: string;
    roles: string[];
    displayOrder: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
  };
  userId: string | {
    _id: string;
    email: string;
    name: string;
    batch: string | null;
    photo?: string;
    currentPosition?: string;
  };
  assignedDate: string;
  unassignedDate?: string;
  isActive: boolean;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  user?: any; // Will be populated with user details
  designation?: CommitteeDesignation; // Will be populated with designation details
}

export interface CommitteeWithMembers extends Committee {
  members: CommitteeMember[];
}

@Injectable({
  providedIn: 'root',
})
export class CommitteeService extends BaseService<Committee> {
  private readonly httpClient = inject(HttpClient);
  private readonly apiBaseUrl = inject(API_BASE_URL);

  constructor() {
    super('committees');
  }

  /**
   * Get current committee
   */
  getCurrentCommittee(): Observable<Committee> {
    return this.httpClient.get<Committee>(`${this.apiBaseUrl}/committees/current`);
  }

  /**
   * Get previous committees
   */
  getPreviousCommittees(): Observable<Committee[]> {
    return this.httpClient.get<Committee[]>(`${this.apiBaseUrl}/committees/previous`);
  }

  /**
   * Get upcoming committees
   */
  getUpcomingCommittees(): Observable<Committee[]> {
    return this.httpClient.get<Committee[]>(`${this.apiBaseUrl}/committees/upcoming`);
  }

  /**
   * Get published committees
   */
  getPublishedCommittees(): Observable<Committee[]> {
    return this.httpClient.get<Committee[]>(`${this.apiBaseUrl}/committees/published`);
  }

  /**
   * Get committee members by committee ID
   */
  getCommitteeMembers(committeeId: string, includeInactive = false): Observable<CommitteeMember[]> {
    const params = includeInactive ? '?includeInactive=true' : '';
    return this.httpClient.get<CommitteeMember[]>(
      `${this.apiBaseUrl}/committee-designations/committee/${committeeId}/members${params}`
    );
  }

  /**
   * Get committee structure (designations and members)
   */
  getCommitteeStructure(committeeId: string): Observable<any> {
    return this.httpClient.get<any>(
      `${this.apiBaseUrl}/committee-designations/committee/${committeeId}/structure`
    );
  }

  /**
   * Get committee with members
   */
  getCommitteeWithMembers(committeeId: string, includeInactive = false): Observable<CommitteeWithMembers> {
    const params = includeInactive ? '?includeInactive=true' : '';
    return this.httpClient.get<CommitteeWithMembers>(
      `${this.apiBaseUrl}/committee-designations/committee/${committeeId}/full${params}`
    );
  }

  /**
   * Get all designations by committee
   */
  getDesignationsByCommittee(committeeId: string): Observable<CommitteeDesignation[]> {
    return this.httpClient.get<CommitteeDesignation[]>(
      `${this.apiBaseUrl}/committee-designations/committee/${committeeId}`
    );
  }
}
