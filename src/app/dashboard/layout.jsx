import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-[#fefce8] text-neutral-800 selection:bg-yellow-300 selection:text-neutral-900">
      <DashboardSidebar />
      <div className="flex-1 min-w-0 relative overflow-y-auto">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.12),transparent_60%)] pointer-events-none" />
        <main className="relative z-10 flex-1">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;