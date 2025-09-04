import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, firstValueFrom } from 'rxjs';
import { resource } from '@angular/core';
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
  getStats() {
    return resource<DashboardStats, unknown>({
      loader: () =>
        firstValueFrom(
          this.http.get<DashboardStats>(`${this.baseUrl}/dashboard/stats`),
        ),
      defaultValue: {
        totalAlumni: 0,
        upcomingEvents: 0,
        recentNews: 0,
        latestGraduation: 'N/A',
      },
    });
  }

  /**
   * Get recent activities
   */
  getRecentActivities() {
    return resource<RecentActivity[], unknown>({
      loader: () =>
        firstValueFrom(
          this.http.get<RecentActivity[]>(
            `${this.baseUrl}/dashboard/recent-activities`,
          ),
        ),
      defaultValue: [],
    });
  }
}
