import { ChangeDetectionStrategy, Component, signal } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

interface BlogPost {
    id: string;
    title: string;
    content: string;
    excerpt: string;
    status: 'draft' | 'published' | 'under_review' | 'rejected';
    createdDate: string;
    publishedDate?: string;
    lastModified: string;
    author: string;
    tags: string[];
    category: string;
    readingTime: number;
    likes: number;
    comments: number;
    views: number;
    featuredImage?: string;
    isLiked?: boolean;
}

interface BlogCategory {
    id: string;
    name: string;
    description: string;
    count: number;
}

@Component({
    selector: 'blogs',
    templateUrl: './blogs.html',
    styleUrl: './blogs.scss',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule]
})
export class PortalBlogs {
    protected activeTab = signal<'my-blogs' | 'create' | 'published'>('my-blogs');
    protected selectedFilter = signal<'all' | 'draft' | 'published' | 'under_review' | 'rejected'>('all');
    protected selectedCategory = signal<string>('all');
    protected searchQuery = signal('');

    // Mock data - in real app this would come from backend
    protected myBlogs = signal<BlogPost[]>([
        {
            id: '1',
            title: 'My Journey in Software Engineering',
            content: 'Full content would be here...',
            excerpt: 'Sharing my experiences and lessons learned during my transition from university to the professional world of software engineering.',
            status: 'published',
            createdDate: '2024-11-01',
            publishedDate: '2024-11-05',
            lastModified: '2024-11-03',
            author: 'John Doe',
            tags: ['career', 'software engineering', 'experience'],
            category: 'Career',
            readingTime: 8,
            likes: 23,
            comments: 7,
            views: 156,
            featuredImage: '/images/blogs/software-journey.jpg',
            isLiked: true
        },
        {
            id: '2',
            title: 'Best Practices for React Development',
            content: 'Full content would be here...',
            excerpt: 'A comprehensive guide to modern React development practices, including hooks, performance optimization, and testing strategies.',
            status: 'under_review',
            createdDate: '2024-11-15',
            lastModified: '2024-11-16',
            author: 'John Doe',
            tags: ['react', 'javascript', 'web development', 'best practices'],
            category: 'Technology',
            readingTime: 12,
            likes: 0,
            comments: 0,
            views: 0
        },
        {
            id: '3',
            title: 'Alumni Network: Building Professional Connections',
            content: 'Full content would be here...',
            excerpt: 'How to effectively leverage your alumni network for career growth and professional development.',
            status: 'draft',
            createdDate: '2024-11-20',
            lastModified: '2024-11-22',
            author: 'John Doe',
            tags: ['networking', 'career', 'alumni'],
            category: 'Career',
            readingTime: 6,
            likes: 0,
            comments: 0,
            views: 0
        }
    ]);

    protected categories = signal<BlogCategory[]>([
        { id: 'technology', name: 'Technology', description: 'Tech trends, tutorials, and insights', count: 45 },
        { id: 'career', name: 'Career', description: 'Career advice and professional development', count: 32 },
        { id: 'entrepreneurship', name: 'Entrepreneurship', description: 'Startup stories and business insights', count: 18 },
        { id: 'lifestyle', name: 'Lifestyle', description: 'Work-life balance and personal growth', count: 24 },
        { id: 'education', name: 'Education', description: 'Learning resources and academic insights', count: 16 }
    ]);

    protected newBlog = signal({
        title: '',
        excerpt: '',
        content: '',
        category: '',
        tags: '',
        featuredImage: ''
    });

    protected isSubmitting = signal(false);

    // Computed properties to avoid complex template expressions
    protected get publishedBlogsCount(): number {
        return this.myBlogs().filter(b => b.status === 'published').length;
    }

    protected get publishedBlogs(): BlogPost[] {
        return this.myBlogs().filter(b => b.status === 'published');
    }

    protected get filteredBlogs(): BlogPost[] {
        const filter = this.selectedFilter();
        const category = this.selectedCategory();
        const query = this.searchQuery().toLowerCase();

        return this.myBlogs().filter(blog => {
            const matchesFilter = filter === 'all' || blog.status === filter;
            const matchesCategory = category === 'all' || blog.category === category;
            const matchesSearch = !query || 
                blog.title.toLowerCase().includes(query) ||
                blog.content.toLowerCase().includes(query) ||
                blog.tags.some(tag => tag.toLowerCase().includes(query));

            return matchesFilter && matchesCategory && matchesSearch;
        });
    }

    protected setActiveTab(tab: 'my-blogs' | 'create' | 'published') {
        this.activeTab.set(tab);
    }

    protected setFilter(filter: 'all' | 'draft' | 'published' | 'under_review' | 'rejected') {
        this.selectedFilter.set(filter);
    }

    protected setCategory(category: string) {
        this.selectedCategory.set(category);
    }

    protected getFilteredBlogs(): BlogPost[] {
        let blogs = this.myBlogs();

        // Apply status filter
        if (this.selectedFilter() !== 'all') {
            blogs = blogs.filter(blog => blog.status === this.selectedFilter());
        }

        // Apply category filter
        if (this.selectedCategory() !== 'all') {
            blogs = blogs.filter(blog => blog.category.toLowerCase() === this.selectedCategory());
        }

        // Apply search filter
        const query = this.searchQuery().toLowerCase();
        if (query) {
            blogs = blogs.filter(blog => 
                blog.title.toLowerCase().includes(query) ||
                blog.excerpt.toLowerCase().includes(query) ||
                blog.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        return blogs.sort((a, b) => new Date(b.lastModified).getTime() - new Date(a.lastModified).getTime());
    }

    protected getStatusClass(status: string): string {
        switch (status) {
            case 'published': return 'status-published';
            case 'draft': return 'status-draft';
            case 'under_review': return 'status-review';
            case 'rejected': return 'status-rejected';
            default: return 'status-default';
        }
    }

    protected getStatusText(status: string): string {
        switch (status) {
            case 'published': return 'Published';
            case 'draft': return 'Draft';
            case 'under_review': return 'Under Review';
            case 'rejected': return 'Rejected';
            default: return 'Unknown';
        }
    }

    protected formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    protected calculateReadingTime(content: string): number {
        const wordsPerMinute = 200;
        const wordCount = content.split(' ').length;
        return Math.ceil(wordCount / wordsPerMinute);
    }

    protected validateBlog(): boolean {
        const blog = this.newBlog();
        return !!(
            blog.title.trim() &&
            blog.excerpt.trim() &&
            blog.content.trim().length >= 100 &&
            blog.category.trim() &&
            blog.tags.trim()
        );
    }

    protected async saveDraft() {
        if (!this.newBlog().title.trim()) {
            alert('Please enter a title for your blog post');
            return;
        }

        this.isSubmitting.set(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            const newPost: BlogPost = {
                id: Date.now().toString(),
                title: this.newBlog().title,
                excerpt: this.newBlog().excerpt,
                content: this.newBlog().content,
                status: 'draft',
                createdDate: new Date().toISOString().split('T')[0],
                lastModified: new Date().toISOString().split('T')[0],
                author: 'John Doe', // Current user
                tags: this.newBlog().tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                category: this.newBlog().category || 'General',
                readingTime: this.calculateReadingTime(this.newBlog().content),
                likes: 0,
                comments: 0,
                views: 0,
                featuredImage: this.newBlog().featuredImage
            };

            this.myBlogs.update(blogs => [newPost, ...blogs]);
            this.resetForm();
            this.setActiveTab('my-blogs');
            
            alert('Blog post saved as draft successfully!');
        } catch (error) {
            alert('Failed to save draft. Please try again.');
        } finally {
            this.isSubmitting.set(false);
        }
    }

    protected async submitForReview() {
        if (!this.validateBlog()) {
            alert('Please fill in all required fields with adequate content');
            return;
        }

        this.isSubmitting.set(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));

            const newPost: BlogPost = {
                id: Date.now().toString(),
                title: this.newBlog().title,
                excerpt: this.newBlog().excerpt,
                content: this.newBlog().content,
                status: 'under_review',
                createdDate: new Date().toISOString().split('T')[0],
                lastModified: new Date().toISOString().split('T')[0],
                author: 'John Doe', // Current user
                tags: this.newBlog().tags.split(',').map(tag => tag.trim()).filter(tag => tag),
                category: this.newBlog().category,
                readingTime: this.calculateReadingTime(this.newBlog().content),
                likes: 0,
                comments: 0,
                views: 0,
                featuredImage: this.newBlog().featuredImage
            };

            this.myBlogs.update(blogs => [newPost, ...blogs]);
            this.resetForm();
            this.setActiveTab('my-blogs');
            
            alert('Blog post submitted for review successfully! You will be notified once it is reviewed.');
        } catch (error) {
            alert('Failed to submit for review. Please try again.');
        } finally {
            this.isSubmitting.set(false);
        }
    }

    protected resetForm() {
        this.newBlog.set({
            title: '',
            excerpt: '',
            content: '',
            category: '',
            tags: '',
            featuredImage: ''
        });
    }

    protected editBlog(blog: BlogPost) {
        // In real app, this would open an edit form or navigate to edit page
        console.log('Editing blog:', blog.title);
        alert(`Edit functionality for "${blog.title}" would be implemented here.`);
    }

    protected deleteBlog(blog: BlogPost) {
        if (confirm(`Are you sure you want to delete "${blog.title}"?`)) {
            this.myBlogs.update(blogs => blogs.filter(b => b.id !== blog.id));
            alert('Blog post deleted successfully.');
        }
    }

    protected viewBlog(blog: BlogPost) {
        // In real app, this would navigate to the full blog view
        console.log('Viewing blog:', blog.title);
        alert(`Full blog view for "${blog.title}" would open here.`);
    }

    protected publishBlog(blog: BlogPost) {
        if (confirm(`Are you sure you want to publish "${blog.title}"?`)) {
            // In real app, this would make an API call
            blog.status = 'under_review';
            blog.lastModified = new Date().toISOString().split('T')[0];
            this.myBlogs.update(blogs => [...blogs]);
            alert('Blog submitted for review before publishing.');
        }
    }
}
