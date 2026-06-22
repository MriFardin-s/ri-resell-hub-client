import { serverFetch } from "../core/server"

export const getWishlist = (currentUserMail) =>{
    return serverFetch(`/api/wishlist/user/${currentUserMail}`)
}