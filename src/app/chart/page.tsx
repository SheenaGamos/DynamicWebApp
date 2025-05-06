'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

export default function DashboardPage() {
  const [userCount, setUserCount] = useState(0);
  const [postCount, setPostCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUserCount(data.length));

    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(res => res.json())
      .then(data => setPostCount(data.length));

    fetch('https://jsonplaceholder.typicode.com/comments')
      .then(res => res.json())
      .then(data => setCommentCount(data.length));
  }, []);

  const chartOptions: ApexOptions = {
    labels: ['Users', 'Posts', 'Comments'],
    legend: {
      position: 'bottom',
    },
    responsive: [{
      breakpoint: 480,
      options: {
        chart: {
          width: 300
        },
        legend: {
          position: 'bottom',
        }
      }
    }]
  };
  
  

  const chartSeries = [userCount, postCount, commentCount];

  return (
    <div className="p-8 w-full max-w-4xl mx-auto bg-white/40 backdrop-blur-md rounded-2xl shadow-xl">
      <h1 className="text-4xl font-semibold text-gray-800 mb-4 text-center">Data Distribution</h1>

      <p className="text-lg text-gray-600 mb-6 text-center">
        Distribution of Users, Posts, and Comments.
      </p>

      <div className="w-full mx-auto flex justify-center">
        <Chart
          options={chartOptions}
          series={chartSeries}
          type="pie"
          height={350}
        />
      </div>

      <div className="mt-6 text-center">
        <a href="/users" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
          Go to Users Page
        </a>
      </div>
    </div>
  );
}
