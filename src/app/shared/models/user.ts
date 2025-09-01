export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role?: string;
  batch?: string;
  profession?: string;
  company?: string;
  location?: string;
  bio?: string;
  socialLinks?: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    github?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
