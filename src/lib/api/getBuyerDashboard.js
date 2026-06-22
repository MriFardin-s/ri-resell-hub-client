import { serverFetch } from "../core/server"

export const getBuyerDashboard = async (currentUserMail) =>{
    return serverFetch(`/api/buyer/dashboard-summary?email=${currentUserMail}`)
}