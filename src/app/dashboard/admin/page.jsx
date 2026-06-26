import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import AdminDashboardClient from './AdminDashboardClient';

const AdminDashboardHome = async () => {
  // const user = await getUserSession();

  // if (!user) {
  //   redirect('/login');
  // }

  // if (user.role !== 'admin') {
  //   redirect('/');
  // }

  return <AdminDashboardClient />;
};

export default AdminDashboardHome;