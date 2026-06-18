import { DashboardSidebar } from '@/components/dashboard/DashboardSidebar';
import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-neutral-950 text-white selection:bg-yellow-400 selection:text-neutral-950">
      <DashboardSidebar />
      <div className="flex-1 min-w-0 bg-neutral-950 relative overflow-y-auto">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(250,204,21,0.03),transparent_50%)] pointer-events-none" />
        <main className="relative z-10">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;