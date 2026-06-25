import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import AdminAnalyticsClient from './AdminAnalyticsClient';


const AdminAnalytics = async () => {
  const user = await getUserSession();

  if (!user) {
    redirect('/login');
  }

  if (user.userRole !== 'admin') {
    redirect('/');
  }

  return <AdminAnalyticsClient />;
};

export default AdminAnalytics;