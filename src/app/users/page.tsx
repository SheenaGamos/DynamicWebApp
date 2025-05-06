'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

type User = {
  id: number;
  name: string;
  username: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  return (
    <div className="p-8 w-[80%] mx-auto bg-white/30 backdrop-blur-md rounded-2xl shadow-xl">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">User List</h1>
      <ul className="space-y-6">
        {users.map(user => (
          <li key={user.id} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-transform transform hover:scale-105">
            <Link href={`/users/${user.id}`}>
              <div className="space-y-2">
                <p className="font-semibold text-xl text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">@{user.username}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
  
}
