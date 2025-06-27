import { Link } from "react-router-dom";
import { Blog } from "../models";

export const BlogCard = ({ title, thumbnail, content, author, createdAt }: Blog) => {
  const daysAgo = (dateString?: string) => {
    if (!dateString) return "Unknown";

    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    return Math.floor(diffTime / (1000 * 60 * 60 * 24));
  };

  return (
    <Link to="/blogs/1">
      <div className="p-4 shadow-lg rounded-lg bg-white border border-gray-200">
        <div className="mb-6 aspect-video relative p-4 flex items-center justify-center flex-col">
          <img
            className="aspect-video object-center object-cover -rotate-6 shadow-2xl rounded-lg"
            src={thumbnail || 'https://as1.ftcdn.net/v2/jpg/01/34/53/74/1000_F_134537443_VendrqyXIWyHrZgxdIsfyKUost734JDP.jpg'}
          />
          <div className="-z-10 rotate-3 bg-primary/20 rounded-lg w-full absolute aspect-video"></div>
        </div>

        <div className="mb-4">
          <h4 className="font-bold text-xl mb-2">
            { title || 'Untitled Blog' }
          </h4>
          {content && <p className="text-sm text-gray-600">
            { content?.length > 100 ? `${content?.slice(0, 100)}...` : content }
          </p>}
        </div>

        <div className="text-sm flex items-center justify-between">
          <span className="text-primary">By { author?.name || 'Ghost' }</span>
          <span>{ daysAgo(createdAt) } days ago</span>
        </div>
      </div>
    </Link>
  );
};
