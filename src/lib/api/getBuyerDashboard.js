import { protectedFetch } from "../core/server"

export const getBuyerDashboard = async (currentUserMail) =>{
    return protectedFetch(`/api/buyer/dashboard-summary?email=${currentUserMail}`)
}