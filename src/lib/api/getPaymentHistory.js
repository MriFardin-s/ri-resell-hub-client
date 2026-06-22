import { serverFetch } from "../core/server"

export const getPaymentHistory = async (email) => {
   
    const res = await serverFetch(`/api/payments/buyer/${email}`, {
        cache: 'no-store' 
    });


    return res?.success ? res.data : [];
};