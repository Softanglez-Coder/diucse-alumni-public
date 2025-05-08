import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { UserCircle2, Tag, CalendarDays } from "lucide-react";
import { blogs } from "../constants/blogs";
import MainNav from "../components/layout/MainNav";
import Footer from "../components/layout/Footer";
import { useSearchParams, useNavigate } from "react-router-dom";

export default function BlogPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const tagParam = searchParams.get("tag");
  const authorParam = searchParams.get("author");

  const [selectedAuthor, setSelectedAuthor] = useState("All");
  const [selectedTag, setSelectedTag] = useState("All");

  useEffect(() => {
    if (authorParam) setSelectedAuthor(authorParam);
    if (tagParam) setSelectedTag(tagParam);
  }, [authorParam, tagParam]);

  const authors = ["All", ...new Set(blogs.map((blog) => blog.author))];
  const tags = ["All", ...new Set(blogs.map((blog) => blog.tag))];

  const filteredBlogs = blogs.filter((blog) => {
    return (
      (selectedAuthor === "All" || blog.author === selectedAuthor) &&
      (selectedTag === "All" || blog.tag === selectedTag)
    );
  });

  const handleAuthorClick = (author) => navigate(`?author=${author}`);
  const handleTagClick = (tag) => navigate(`?tag=${tag}`);

  const shareLinks = (blog) => ({
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      window.location.origin + `/blog/${blog.id}`
    )}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
      window.location.origin + `/blog/${blog.id}`
    )}&title=${encodeURIComponent(blog.title)}&summary=${encodeURIComponent(blog.excerpt)}`
  });

  return (
    <div>
      <MainNav />
      <section className="bg-white py-16 px-4">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">Latest Blog Posts</h2>

        {/* Filter Bar */}
        <div className="max-w-6xl mx-auto mb-10 flex flex-col sm:flex-row gap-4 justify-between">
          <div>
            <label className="text-gray-700 font-medium mr-2">Filter by Author:</label>
            <select
              value={selectedAuthor}
              onChange={(e) => setSelectedAuthor(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            >
              {authors.map((author) => (
                <option key={author} value={author}>
                  {author}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-gray-700 font-medium mr-2">Filter by Tag:</label>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="border border-gray-300 rounded-md p-2"
            >
              {tags.map((tag) => (
                <option key={tag} value={tag}>
                  {tag}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Blog Grid */}
        <div className="grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
          {filteredBlogs.map((blog, index) => {
            const share = shareLinks(blog);
            return (
              <motion.article
                key={blog.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.05 * index, duration: 0.4 }}
                className="rounded-2xl shadow-md hover:shadow-xl transition border border-gray-100 bg-white overflow-hidden"
              >
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                />
                <div className="p-5 flex flex-col gap-3">
                  <div
                    className="flex items-center gap-2 text-sm text-green-600 font-medium cursor-pointer hover:underline"
                    onClick={() => handleTagClick(blog.tag)}
                  >
                    <Tag className="h-4 w-4" />
                    {blog.tag}
                  </div>

                  <h3 className="text-xl font-bold text-gray-800 leading-snug hover:underline">
                    <a href={`/blog/${blog.id}`}>{blog.title}</a>
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">{blog.excerpt}</p>

                  <div
                    className="flex items-center gap-2 mt-4 text-sm text-gray-500 cursor-pointer hover:underline"
                    onClick={() => handleAuthorClick(blog.author)}
                  >
                    <UserCircle2 className="h-5 w-5 text-green-500" />
                    {blog.author}
                  </div>

                  {blog.date && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <CalendarDays className="h-4 w-4" />
                      {new Date(blog.date).toLocaleDateString()}
                    </div>
                  )}

                  <div className="flex justify-between items-center mt-4">
                    <a
                      href={`/blog/${blog.id}`}
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                    >
                      Read More →
                    </a>

                    <div className="flex gap-2">
                      <a href={share.facebook} target="_blank" rel="noopener noreferrer" title="Share on Facebook">
                        <img src="/icons/facebook.svg" alt="Facebook" className="w-5 h-5" />
                      </a>
                      <a href={share.linkedin} target="_blank" rel="noopener noreferrer" title="Share on LinkedIn">
                        <img src="/icons/linkedin.svg" alt="LinkedIn" className="w-5 h-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </section>
      <Footer />
    </div>
  );
}
