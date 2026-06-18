'use client';
import React from 'react';
import StatCard from './dashboard/StatCard';

export default function StatsGrid({ statsData }) {
  if (!statsData || statsData.length === 0) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 px-2 w-full bg-transparent">
      {statsData.map((stat, index) => (
        <StatCard
          key={index}
          title={stat.title}
          value={stat.value}
          icon={stat.icon}
          change={stat.change}
        />
      ))}
    </div>
  );
}