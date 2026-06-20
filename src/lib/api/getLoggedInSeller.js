import { getUserSession } from "../core/session"
import { getProducts } from "./products"

export const getLoggedInSeller = async () => {
    const user = await getUserSession()
    return getProducts(user?.id)
}
