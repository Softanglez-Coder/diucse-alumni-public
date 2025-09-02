import { ChangeDetectionStrategy, Component, signal, inject, computed, effect } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { BlogService, BlogStatus, CreateBlogDto, UpdateBlogDto } from "../../../services";

interface BlogFormData {
    title: string;
    content: string;
    excerpt?: string;
    image?: string;
    tags?: string[];
}

@Component({
    selector: 'portal-blogs',
    templateUrl: './blogs.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule, FormsModule, RouterModule],
    providers: [BlogService]
})
export class PortalBlogs {
    private blogService = inject(BlogService);

    protected activeTab = signal<'my-blogs' | 'create' | 'published'>('my-blogs');
    protected selectedFilter = signal<BlogStatus | 'all'>('all');
    protected searchQuery = signal('');
    protected isCreating = signal(false);
    protected editingBlog = signal<string | null>(null);

    // Blog form data
    protected blogForm = signal<BlogFormData>({
        title: '',
        content: '',
        excerpt: '',
        image: '',
        tags: []
    });

    // Get user's blogs from API
    protected myBlogsResource = this.blogService.getMyBlogs();

    // Get published blogs from API
    protected publishedBlogsResource = this.blogService.getPublishedBlogs();

    // Get blogs by status
    protected draftBlogsResource = this.blogService.getMyBlogsByStatus(BlogStatus.DRAFT);
    protected reviewBlogsResource = this.blogService.getMyBlogsByStatus(BlogStatus.IN_REVIEW);

    // Computed properties for blogs
    protected myBlogs = computed(() => this.myBlogsResource.value() || []);
    protected publishedBlogs = computed(() => this.publishedBlogsResource.value() || []);
    protected draftBlogs = computed(() => this.draftBlogsResource.value() || []);
    protected reviewBlogs = computed(() => this.reviewBlogsResource.value() || []);

    // Blog counts
    protected myBlogsCount = computed(() => this.myBlogs().length);
    protected publishedBlogsCount = computed(() => this.publishedBlogs().length);
    protected draftBlogsCount = computed(() => this.draftBlogs().length);
    protected reviewBlogsCount = computed(() => this.reviewBlogs().length);

    // Computed filtered blogs based on selected filter
    protected filteredMyBlogs = computed(() => {
        const filter = this.selectedFilter();
        const search = this.searchQuery().toLowerCase();
        let blogs = this.myBlogs();

        // Filter by status
        if (filter !== 'all') {
            blogs = blogs.filter(blog => blog.status === filter);
        }

        // Filter by search query
        if (search) {
            blogs = blogs.filter(blog =>
                blog.title.toLowerCase().includes(search) ||
                blog.content.toLowerCase().includes(search)
            );
        }

        return blogs;
    });

    // Tab change methods
    setActiveTab(tab: 'my-blogs' | 'create' | 'published') {
        this.activeTab.set(tab);
    }

    setFilter(filter: BlogStatus | 'all') {
        this.selectedFilter.set(filter);
    }

    setSearchQuery(query: string) {
        this.searchQuery.set(query);
    }

    // Blog management methods
    createBlog() {
        const formData = this.blogForm();
        const createData: CreateBlogDto = {
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt,
            image: formData.image,
            tags: formData.tags
        };

        this.isCreating.set(true);
        const result = this.blogService.createBlog(createData);

        // Handle the result based on loading state
        effect(() => {
            if (!result.isLoading()) {
                this.isCreating.set(false);
                if (result.value()) {
                    this.resetForm();
                    this.setActiveTab('my-blogs');
                }
            }
        });
    }

    editBlog(blogId: string) {
        this.editingBlog.set(blogId);
        // Load blog data into form
        const blog = this.myBlogs().find(b => b.id === blogId);
        if (blog) {
            this.blogForm.set({
                title: blog.title,
                content: blog.content,
                excerpt: blog.excerpt,
                image: blog.image,
                tags: blog.tags
            });
            this.setActiveTab('create');
        }
    }

    updateBlog() {
        const blogId = this.editingBlog();
        if (!blogId) return;

        const formData = this.blogForm();
        const updateData: UpdateBlogDto = {
            title: formData.title,
            content: formData.content,
            excerpt: formData.excerpt,
            image: formData.image,
            tags: formData.tags
        };

        const result = this.blogService.updateBlog(blogId, updateData);
        this.editingBlog.set(null);
        this.resetForm();
        this.setActiveTab('my-blogs');
    }

    // Blog status change methods
    draftBlog(blogId: string) {
        this.blogService.draftBlog(blogId);
        this.refreshData();
    }

    submitForReview(blogId: string) {
        this.blogService.reviewBlog(blogId);
        this.refreshData();
    }

    // Helper methods
    resetForm() {
        this.blogForm.set({
            title: '',
            content: '',
            excerpt: '',
            image: '',
            tags: []
        });
    }

    refreshData() {
        // Trigger refresh of all resources
        this.myBlogsResource.reload?.();
        this.publishedBlogsResource.reload?.();
        this.draftBlogsResource.reload?.();
        this.reviewBlogsResource.reload?.();
    }

    getStatusBadgeClass(status: BlogStatus): string {
        switch (status) {
            case BlogStatus.DRAFT:
                return 'bg-gray-100 text-gray-800';
            case BlogStatus.IN_REVIEW:
                return 'bg-yellow-100 text-yellow-800';
            case BlogStatus.PUBLISHED:
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    }

    formatDate(dateString: string): string {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Form handlers
    updateFormField(field: keyof BlogFormData, value: any) {
        const current = this.blogForm();
        this.blogForm.set({
            ...current,
            [field]: value
        });
    }

    addTag(tag: string) {
        if (!tag.trim()) return;
        const current = this.blogForm();
        const tags = current.tags || [];
        if (!tags.includes(tag.trim())) {
            this.updateFormField('tags', [...tags, tag.trim()]);
        }
    }

    removeTag(tagIndex: number) {
        const current = this.blogForm();
        const tags = current.tags || [];
        this.updateFormField('tags', tags.filter((_, index) => index !== tagIndex));
    }
}
