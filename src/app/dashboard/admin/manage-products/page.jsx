import { redirect } from 'next/navigation';
import { getUserSession } from '@/lib/core/session';
import AdminProductsClient from './AdminProductsClient';

const AdminManageProducts = async () => {
  const user = await getUserSession();

  if (!user) {
    redirect('/login');
  }

  if (user.userRole !== 'admin') {
    redirect('/');
  }

  return <AdminProductsClient />;
};

export default AdminManageProducts;