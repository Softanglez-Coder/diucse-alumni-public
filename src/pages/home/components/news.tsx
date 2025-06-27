import { BlogCard } from "../../../components";

export const HomeNews = () => {
    return (
        <div>
          <div className="container mx-auto px-4 md:px-0 py-8">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-primary">Latest News</h2>
              <p className="text-gray-600 mt-2">
                Stay updated with the latest news and announcements from our
                community.
              </p>
            </div>
    
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <BlogCard />
              <BlogCard />
              <BlogCard />
              <BlogCard />
            </div>
          </div>
        </div>
      );
};