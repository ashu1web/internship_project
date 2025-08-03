import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getUserPosts } from "../api/Auth.js";
import dayjs from "dayjs";

export default function Profile() {
  const { userId } = useParams();

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["userProfile", userId],
    queryFn: () => getUserPosts(userId),
  });

  if (isLoading) return <p>Loading profile...</p>;
  if (isError || !data) return <p>Something went wrong</p>;

  const { user, posts } = data;

  return (
    <div className="max-w-3xl mx-auto px-4 py-6">
      <div className="bg-white shadow rounded-xl p-6 mb-8">
        <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
        <p className="text-gray-600">{user.email}</p>
        <p className="text-gray-700 mt-2">{user.bio || "No bio provided."}</p>
      </div>

      <h2 className="text-xl font-semibold mb-4">Posts</h2>
      {posts.length === 0 ? (
        <p>This user has not made any posts yet.</p>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white shadow-sm border border-gray-200 rounded-xl p-4"
            >
              <p className="text-gray-800">{post.content}</p>
              <p className="text-sm text-gray-500 mt-2">
                Posted on {dayjs(post.createdAt).format("DD MMM YYYY, hh:mm A")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

