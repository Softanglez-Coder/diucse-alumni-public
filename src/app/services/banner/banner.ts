import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services';

export interface Banner {
  id: string;
  order: number;
  image: string;
  title: string;
  description: string;
  link: string;
}

@Injectable()
export class BannerService extends BaseService<Banner> {
  constructor() {
    super('banners');
  }
}
