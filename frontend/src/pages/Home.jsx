import { useQuery } from '@tanstack/react-query';
import { getAllPosts } from '../api/Auth.js';
import PostCard from '../components/PostCard.jsx';
import PostForm from "../components/PostForm.jsx";

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  });

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <h1 className="text-3xl font-bold mb-6 text-center">🌍 Community Feed</h1>

          <PostForm /> {/* ✅ Add this to allow posting */}

      {isLoading && <p className="text-center text-gray-500">Loading posts...</p>}
      {isError && (
        <p className="text-center text-red-500">Failed to load posts. Please try again.</p>
      )}

    {Array.isArray(data) && data.length > 0 ? (
  data.map((post) => <PostCard key={post._id} post={post} />)
) : isLoading ? null : (
  <p className="text-center text-gray-600">No posts yet. Be the first to post something!</p>
)}

    </div>
  );
};

export default Home;

