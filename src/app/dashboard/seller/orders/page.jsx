import { getUserSession } from '@/lib/core/session';
import SellerOrdersClient from './SellerOrdersClient';


const SellerOrderManagePage = async () => {
  const user = await getUserSession();

  return <SellerOrdersClient user={user} />;
};

export default SellerOrderManagePage;