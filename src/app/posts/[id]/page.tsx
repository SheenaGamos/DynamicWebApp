'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

type Post = { id: number; title: string; body: string; userId: number };
type Comment = { id: number; name: string; email: string; body: string };

export default function PostDetailPage() {
  const router = useRouter();
  const params = useParams();
  const postId = Number(params?.id);

  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userJson = localStorage.getItem('user');
    if (!userJson) {
      router.push('/login');
      return;
    }

    const user = JSON.parse(userJson);

    // Fetch post
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then(res => res.json())
      .then(data => {
        if (!user.isAdmin && data.userId !== user.id) {
          router.push('/posts');
        } else {
          setPost(data);
        }
      });

    // Fetch comments
    fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
      .then(res => res.json())
      .then(setComments)
      .finally(() => setLoading(false));
  }, [postId, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px] text-gray-500 text-lg">
        <span className="animate-pulse">Loading post...</span>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="text-center text-red-600 p-8 text-xl">
        ⚠️ Post not found or access denied.
      </div>
    );
  }

  return (
    <div className="p-8 w-[90%] max-w-5xl mx-auto bg-white/30 backdrop-blur-md rounded-2xl shadow-xl">
      <Link href="/posts">
        <button className="mb-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
          ← Back to Posts
        </button>
      </Link>

      {/* Post Content */}
      <div className="border-b border-gray-300 pb-6 mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{post.title}</h1>
        <p className="text-lg text-gray-700 leading-relaxed">{post.body}</p>
      </div>

      {/* Comments */}
      <div className="mt-8">
        <h2 className="text-3xl font-semibold text-gray-800 mb-4">Comments</h2>
        <ul className="space-y-6">
          {comments.map(comment => (
            <li
              key={comment.id}
              className="bg-white p-5 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <div className="space-y-1">
                <p className="font-medium text-gray-800">{comment.name}</p>
                <p className="text-sm text-gray-500">{comment.email}</p>
                <p className="text-gray-700 leading-relaxed">{comment.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
