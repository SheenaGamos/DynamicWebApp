'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type Post = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) return;

    const user = JSON.parse(storedUser);
    const isAdmin = user.isAdmin === true;
    const userId = user.id;

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => {
        const filtered = isAdmin ? data : data.filter((post: Post) => post.userId === userId);
        setPosts(filtered);
        setLoading(false);
      });
  }, []);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4 sm:p-8 w-full max-w-6xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold text-center mb-6 text-gray-800">Latest Posts</h1>

      {/* Search */}
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          placeholder="Search posts by title..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full sm:w-96 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow animate-pulse">
              <div className="h-5 bg-gray-200 mb-3 w-2/3 rounded"></div>
              <div className="h-4 bg-gray-200 mb-2 w-full rounded"></div>
              <div className="h-4 bg-gray-200 mb-2 w-full rounded"></div>
              <div className="h-4 bg-gray-200 w-1/2 rounded"></div>
            </div>
          ))}
        </div>
      ) : filteredPosts.length === 0 ? (
        <div className="text-center text-gray-500 mt-10 text-lg">
          No posts found.
        </div>
      ) : (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map(post => (
            <li
              key={post.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-transform transform hover:scale-105"
            >
              <Link href={`/posts/${post.id}`}>
                <div className="space-y-3 cursor-pointer">
                  <h2 className="text-2xl font-semibold text-gray-800 hover:text-blue-600 transition">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 text-base line-clamp-3">{post.body}</p>
                  <span className="inline-block text-sm text-blue-500 hover:underline">
                    Read more →
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
