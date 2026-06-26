import { protectedFetch } from "../core/server"


export const getMyOrders = async (currentUserMail) =>{
    return protectedFetch(`/api/buyer/my-orders/${currentUserMail}`)
}