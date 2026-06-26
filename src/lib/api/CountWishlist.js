import { protectedFetch, serverFetch } from "../core/server"

export const getWishlist = (currentUserMail) =>{
    return protectedFetch(`/api/wishlist/user/${currentUserMail}`)
}