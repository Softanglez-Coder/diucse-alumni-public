import { useEffect, useState } from "react";
import { BlogCard } from "../../../components";
import { Blog } from "../../../models";
import { apiService } from "../../../services/api";

export const HomeBlogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    const abortController = new AbortController();
    
    const fetchBlogs = async () => {
      try {
        const blogs = await apiService.find<Blog[]>("blog", {
          limit: 4,
          sort: "createdAt",
        });
        
        if (!abortController.signal.aborted) {
          setBlogs(blogs);
        }
      } catch (error) {
        if (!abortController.signal.aborted) {
          console.error("Error fetching blogs:", error);
        }
      }
    };
    
    fetchBlogs();
    
    return () => {
      abortController.abort();
    };
  }, []);

  return (
    <div className="bg-primary/5">
      <div className="container mx-auto px-4 md:px-0 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-primary">Latest Blogs</h2>
          <p className="text-gray-600 mt-2">
            Stay updated with our latest insights and articles on various
            topics.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {blogs.length > 0 ? (
            blogs.map((blog) => <BlogCard key={blog._id} title={blog.title} />)
          ) : (
            <p className="text-gray-600">No blogs available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};
