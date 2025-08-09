import { ChangeDetectionStrategy, Component, signal, inject, computed } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { BlogService, Blog } from "../../../services";

interface BlogCategory {
    id: string;
    name: string;
    description: string;
    count: number;
}

@Component({
    selector: 'blogs',
    templateUrl: './blogs.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule],
    providers: [BlogService]
})
export class PortalBlogs {
    private blogService = inject(BlogService);

    protected activeTab = signal<'my-blogs' | 'create' | 'published'>('my-blogs');
    protected selectedFilter = signal<'all' | 'draft' | 'published' | 'under_review' | 'rejected'>('all');
    protected selectedCategory = signal<string>('all');
    protected searchQuery = signal('');

    // Get user's blogs from API
    protected myBlogsResource = this.blogService.findAll({
        author: 'current-user', // This would be determined by auth service
        sortBy: 'lastModified',
        sort: 'desc'
    });

    // Get published blogs from API
    protected publishedBlogsResource = this.blogService.findAll({
        status: 'published',
        sortBy: 'publishedDate',
        sort: 'desc'
    });

    // Computed properties for blogs
    protected myBlogs = computed(() => this.myBlogsResource.value());

    protected publishedBlogs = computed(() => this.publishedBlogsResource.value());

    protected publishedBlogsCount = computed(() => this.publishedBlogs().length);

    // Computed filtered blogs based on selected filter
    protected filteredMyBlogs = computed(() => {
        const blogs = this.myBlogsResource.value();
        const filter = this.selectedFilter();
        const search = this.searchQuery().toLowerCase();
        const category = this.selectedCategory();

        let filtered = blogs;

        // Apply status filter
        if (filter !== 'all') {
            filtered = filtered.filter(blog => blog.status === filter);
        }

        // Apply search filter
        if (search) {
            filtered = filtered.filter(blog =>
                blog.title.toLowerCase().includes(search) ||
                blog.excerpt.toLowerCase().includes(search) ||
                blog.tags.some(tag => tag.toLowerCase().includes(search))
            );
        }

        // Apply category filter
        if (category !== 'all') {
            filtered = filtered.filter(blog => blog.category === category);
        }

        return filtered;
    });

    // Alias for template compatibility
    protected getFilteredBlogs = this.filteredMyBlogs;

    // Blog categories - could be fetched from API
    protected categories = signal<BlogCategory[]>([
        { id: 'technology', name: 'Technology', description: 'Tech articles and tutorials', count: 0 },
        { id: 'career', name: 'Career', description: 'Career advice and professional development', count: 0 },
        { id: 'education', name: 'Education', description: 'Educational content and resources', count: 0 },
        { id: 'personal', name: 'Personal', description: 'Personal experiences and stories', count: 0 }
    ]);

    // New blog form data
    protected newBlog = signal({
        title: '',
        content: '',
        excerpt: '',
        category: '',
        tags: '',
        featuredImage: ''
    });

    // Form submission state
    protected isSubmitting = signal(false);

    protected setActiveTab(tab: 'my-blogs' | 'create' | 'published') {
        this.activeTab.set(tab);
    }

    protected setFilter(filter: 'all' | 'draft' | 'published' | 'under_review' | 'rejected') {
        this.selectedFilter.set(filter);
    }

    protected setCategory(category: string) {
        this.selectedCategory.set(category);
    }

    protected updateSearchQuery(query: string) {
        this.searchQuery.set(query);
    }

    protected getStatusClass(status: string): string {
        const statusClasses = {
            'draft': 'bg-gray-100 text-gray-600',
            'published': 'bg-green-100 text-green-600',
            'under_review': 'bg-yellow-100 text-yellow-600',
            'rejected': 'bg-red-100 text-red-600'
        };
        return statusClasses[status as keyof typeof statusClasses] || 'bg-gray-100 text-gray-600';
    }

    protected getStatusLabel(status: string): string {
        const statusLabels = {
            'draft': 'Draft',
            'published': 'Published',
            'under_review': 'Under Review',
            'rejected': 'Rejected'
        };
        return statusLabels[status as keyof typeof statusLabels] || status;
    }

    protected getStatusText(status: string | undefined): string {
        return this.getStatusLabel(status || 'draft');
    }

    protected formatDate(date: string | Date | undefined): string {
        if (!date) return '';
        const dateObj = new Date(date);
        return dateObj.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    protected calculateReadingTime(content: string): number {
        const wordsPerMinute = 200;
        const wordCount = content.trim().split(/\s+/).length;
        return Math.ceil(wordCount / wordsPerMinute);
    }

    protected validateBlog(): boolean {
        const blog = this.newBlog();
        return !!(blog.title.trim() && blog.content.trim() && blog.category);
    }

    protected resetForm(): void {
        this.newBlog.set({
            title: '',
            content: '',
            excerpt: '',
            category: '',
            tags: '',
            featuredImage: ''
        });
    }

    protected async saveDraft(): Promise<void> {
        if (!this.newBlog().title.trim()) return;

        this.isSubmitting.set(true);
        try {
            // In a real app, this would call the API to save draft
            console.log('Saving draft:', this.newBlog());
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            // Optionally reset form and switch tab
            this.resetForm();
            this.setActiveTab('my-blogs');
        } catch (error) {
            console.error('Error saving draft:', error);
        } finally {
            this.isSubmitting.set(false);
        }
    }

    protected async submitForReview(): Promise<void> {
        if (!this.validateBlog()) return;

        this.isSubmitting.set(true);
        try {
            // In a real app, this would call the API to submit for review
            console.log('Submitting for review:', this.newBlog());
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            this.resetForm();
            this.setActiveTab('my-blogs');
        } catch (error) {
            console.error('Error submitting for review:', error);
        } finally {
            this.isSubmitting.set(false);
        }
    }

    protected viewBlog(blog: Blog): void {
        // In a real app, this would navigate to blog detail view
        console.log('Viewing blog:', blog);
    }

    protected editBlog(blog: Blog): void {
        // In a real app, this would populate the form with blog data for editing
        this.newBlog.set({
            title: blog.title,
            content: blog.content || '',
            excerpt: blog.excerpt,
            category: blog.category,
            tags: blog.tags.join(', '),
            featuredImage: blog.image || ''
        });
        this.setActiveTab('create');
    }

    protected async publishBlog(blog: Blog): Promise<void> {
        if (confirm('Are you sure you want to publish this blog?')) {
            try {
                // In a real app, this would call the API to publish the blog
                console.log('Publishing blog:', blog);
                await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
            } catch (error) {
                console.error('Error publishing blog:', error);
            }
        }
    }

    protected createBlog() {
        const blog = this.newBlog();
        if (blog.title && blog.content && blog.category) {
            // In a real app, this would call the API to create the blog
            console.log('Creating blog:', blog);

            // Reset form
            this.newBlog.set({
                title: '',
                content: '',
                excerpt: '',
                category: '',
                tags: '',
                featuredImage: ''
            });

            // Switch to my blogs tab
            this.setActiveTab('my-blogs');
        }
    }

    protected updateNewBlog(field: string, value: string) {
        this.newBlog.update(blog => ({ ...blog, [field]: value }));
    }

    protected deleteBlog(blog: Blog | string) {
        const blogId = typeof blog === 'string' ? blog : blog.id;
        if (confirm('Are you sure you want to delete this blog?')) {
            // In a real app, this would call the API to delete the blog
            console.log('Deleting blog:', blogId);
        }
    }

    protected toggleLike(blogId: string) {
        // In a real app, this would call the API to toggle like
        console.log('Toggling like for blog:', blogId);
    }
}
