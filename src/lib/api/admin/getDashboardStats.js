import { protectedFetch } from "@/lib/core/server";


export const getDashboardStats = async () => {
  return protectedFetch("/api/admin/dashboard-stats");
};