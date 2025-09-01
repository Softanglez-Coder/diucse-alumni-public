import { User } from './user';

export enum BlogStatus {
  DRAFT = 'draft',
  IN_REVIEW = 'in_review',
  PUBLISHED = 'published',
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
