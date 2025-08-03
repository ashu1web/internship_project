// src/components/PostCard.jsx

const PostCard = ({ post }) => {
  const formattedDate = new Date(post.createdAt).toLocaleString();

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-md transition p-6 mb-6 border border-gray-100">
      {/* Top: Author Info + Date */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {/* Avatar Fallback (Initials) */}
          <div className="w-10 h-10 bg-blue-100 text-blue-600 flex items-center justify-center rounded-full font-semibold uppercase">
            {post.author?.name?.[0] || "U"}
          </div>
          <div>
            <p className="text-gray-800 font-medium">{post.author?.name || "Unknown User"}</p>
            <p className="text-xs text-gray-500">{post.author?.email}</p>
          </div>
        </div>
        <p className="text-sm text-gray-400">{formattedDate}</p>
      </div>

      {/* Post Content */}
      <div className="text-gray-900 text-base leading-relaxed whitespace-pre-wrap">
        {post.content}
      </div>
    </div>
  );
};

export default PostCard;

