import { protectedFetch } from "@/lib/core/server"

export const getSellerOrder = async (userId)=>{
    return protectedFetch(`/api/seller/orders/${userId}`)
}