// src/components/PostForm.jsx
import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost } from "../api/Auth.js";

const PostForm = () => {
  const [content, setContent] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      setContent("");
      queryClient.invalidateQueries(["posts"]); // if you're fetching posts
    },
     onError: (error) => {
    console.error("Post failed:", error?.response?.data || error.message);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      mutate({content});
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 p-4 bg-white rounded shadow">
      <textarea
        className="w-full p-2 border rounded"
        rows="3"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="What's on your mind?"
      ></textarea>
      <button
        type="submit"
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
        disabled={isPending}
      >
        {isPending ? "Posting..." : "Post"}
      </button>
    </form>
  );
};

export default PostForm;
