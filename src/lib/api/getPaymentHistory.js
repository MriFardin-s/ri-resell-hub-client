import { protectedFetch } from "../core/server"

export const getPaymentHistory = async (email) => {
   
    const res = await protectedFetch(`/api/payments/buyer/${email}`, {
        cache: 'no-store' 
    });


    return res?.success ? res.data : [];
};