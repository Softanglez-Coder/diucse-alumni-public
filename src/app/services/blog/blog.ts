import { Injectable } from "@angular/core";
import { BaseService } from "../../shared/services";

export interface Blog {
    id: string;
    title: string;
    excerpt: string;
    content?: string;
    author: string;
    date: string;
    readTime: string;
    image: string;
    tags: string[];
    slug: string;
    featured: boolean;
    active: boolean;
    category: string;
    status?: 'draft' | 'published' | 'under_review' | 'rejected';
    publishedDate?: string;
    lastModified?: string;
    likes?: number;
    comments?: number;
    views?: number;
    isLiked?: boolean;
}

@Injectable()
export class BlogService extends BaseService<Blog> {
    constructor() {
        super('blogs');
    }
}
