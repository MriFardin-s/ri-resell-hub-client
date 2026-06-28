import { getUserSession } from "../core/session"
import { getProducts } from "./products"

export const getLoggedInSeller = async () => {
    const user = await getUserSession()
    // console.log(user)
    return getProducts(user?.id)
}
