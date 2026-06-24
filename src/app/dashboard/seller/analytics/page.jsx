import { getUserSession } from '@/lib/core/session';
import SellerAnalyticsClient from './SellerAnalyticsClient';


const SellerAnalytics = async () => {
  const user = await getUserSession();

  return <SellerAnalyticsClient user={user} />;
};

export default SellerAnalytics;