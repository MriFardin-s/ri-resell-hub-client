import { getUserSession } from '@/lib/core/session';
import { redirect } from 'next/navigation';
import AdminOrdersClient from './AdminOrdersClien';


const AdminManageOrder = async () => {
  const user = await getUserSession();

  if (!user) {
    redirect('/login');
  }

  if (user?.userRole !== 'admin') {
    redirect('/');
  }

  return <AdminOrdersClient />;
};

export default AdminManageOrder;