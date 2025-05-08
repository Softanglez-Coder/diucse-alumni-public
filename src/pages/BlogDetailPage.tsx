import { useParams, Link, useNavigate } from "react-router-dom";
import { blogs } from "../constants/blogs";
import { CalendarDays, Clock, User, ArrowLeft, Share2, Copy } from "lucide-react";
import { FaFacebook, FaLinkedin, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import MainNav from "../components/layout/MainNav";
import Footer from "../components/layout/Footer";

export default function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const blog = blogs.find((b) => b.id === Number(id));

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-red-600 text-lg">
        Blog not found.
      </div>
    );
  }

  const currentUrl = window.location.href;

  const shareUrls = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(blog.title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`,
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(currentUrl);
    alert("Link copied to clipboard!");
  };

  const goToFilterPage = (key: "author" | "tag", value: string) => {
    navigate(`/blog?${key}=${encodeURIComponent(value)}`);
  };

  return (
    <div>
      <MainNav />
      <section className="min-h-screen py-16 px-4 bg-gray-50 text-gray-800">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-200">

        {/* Back Button */}
        <Link to="/blog" className="inline-flex items-center mb-6 text-green-600 hover:text-green-800 font-medium">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Blogs
        </Link>

        {/* Header Image */}
        <img
          src={blog.image}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-xl mb-8 border border-gray-200 shadow"
        />

        {/* Blog Title */}
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-gray-900">{blog.title}</h1>

        {/* Meta Information */}
        <div className="flex items-center gap-4 text-gray-600 text-sm mb-6 flex-wrap">
          <span className="flex items-center gap-1">
            <CalendarDays className="h-4 w-4 text-green-500" />
            {blog.date}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-4 w-4 text-green-500" />
            {blog.readTime}
          </span>
          <button
            onClick={() => goToFilterPage("author", blog.author)}
            className="flex items-center gap-1 text-green-600 hover:underline cursor-pointer"
          >
            <User className="h-4 w-4" />
            {blog.author}
          </button>
          <button
            onClick={() => goToFilterPage("tag", blog.tag)}
            className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold hover:bg-green-200"
          >
            #{blog.tag}
          </button>
        </div>

        {/* Blog Content */}
        <article className="prose prose-lg max-w-none text-gray-700 leading-relaxed tracking-wide whitespace-pre-line">
          {blog.content}
        </article>

        {/* Share Section */}
        <div className="mt-10 border-t pt-6">
          <h4 className="text-sm text-gray-500 mb-2">Share this post:</h4>
          <div className="flex gap-3">
            <a href={shareUrls.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
              <FaFacebook className="h-4 w-4" />
            </a>
            <a href={shareUrls.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
              <FaTwitter className="h-4 w-4" />
            </a>
            <a href={shareUrls.linkedin} target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:underline">
              <FaLinkedinIn className="h-4 w-4"/>
            </a>
            <button onClick={copyToClipboard} className="text-gray-500 hover:text-black flex items-center gap-1">
              <Copy className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
    <Footer />
    </div>
  );
}
