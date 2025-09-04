import { Injectable } from '@angular/core';
import { BaseService } from '../../shared/services';

export interface News {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  date: string;
  author: string;
  image: string;
  featured: boolean;
  active: boolean;
  slug: string;
}

@Injectable()
export class NewsService extends BaseService<News> {
  constructor() {
    super('news');
  }
}
