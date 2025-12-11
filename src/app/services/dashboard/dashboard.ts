import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseService } from '../../shared/services';
import { API_BASE_URL } from '../../core';

export interface DashboardStats {
  totalAlumni: number;
  upcomingEvents: number;
  recentNews: number;
  latestGraduation: string;
}

export interface RecentActivity {
  id: string;
  type:
    | 'new_alumni'
    | 'event_registration'
    | 'system_update'
    | 'news'
    | 'general';
  title: string;
  description: string;
  date: string;
  icon: string;
  iconColor: string;
}

@Injectable()
export class DashboardService {
  private baseUrl: string = inject(API_BASE_URL);
  private readonly http = inject(HttpClient);

  /**
   * Get dashboard statistics
   */
  getStats(): Observable<DashboardStats> {
    return this.http.get<DashboardStats>(`${this.baseUrl}/dashboard/stats`);
  }

  /**
   * Get recent activities
   */
  getRecentActivities(): Observable<RecentActivity[]> {
    return this.http.get<RecentActivity[]>(
      `${this.baseUrl}/dashboard/recent-activities`,
    );
  }
}
