import { User } from './user';

export enum BlogStatus {
  DRAFT = 'draft',
  IN_REVIEW = 'in_review',
  PUBLISHED = 'published',
}

export interface Blog {
  id: string;
  author: User;
  title: string;
  content: string;
  status: BlogStatus;
}
