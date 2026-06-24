import { getUsersList } from '@/lib/api/getUserslist';
import AdminUsersClient from './AdminUsersClient';


const AdminUsersPage = async () => {
  const data = await getUsersList();

  return (
    <AdminUsersClient
      initialUsers={data?.users || []}
    />
  );
};

export default AdminUsersPage;