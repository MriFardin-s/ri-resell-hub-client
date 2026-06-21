import { serverFetch } from "../core/server"


export const getMyOrders = async (currentUserMail) =>{
    return serverFetch(`/api/buyer/my-orders/${currentUserMail}`)
}