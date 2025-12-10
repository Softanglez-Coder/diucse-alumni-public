export interface UserBatch {
  _id?: string;
  id?: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}

export interface User {
  _id?: string;
  id?: string;
  email: string;
  name: string;
  avatar?: string;
  role?: string;
  roles?: string[];
  batch?: UserBatch;
  profession?: string;
  company?: string;
  location?: string;
  bio?: string;
  phone?: string;
  photo?: string | null;
  currentPosition?: string;
  membershipId?: string;
  active?: boolean;
  emailVerified?: boolean;
  socialLinks?: {
    linkedin?: string;
    facebook?: string;
    twitter?: string;
    github?: string;
  };
  createdAt?: string;
  updatedAt?: string;
}
