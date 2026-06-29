import { getFeaturedProducts } from "@/lib/api/getFeaturedProducts";
import FeaturedProductsClient from "./FeaturedProductsClient";

export default async function FeaturedProducts() {
    const productsData = await getFeaturedProducts();

    return (
        <FeaturedProductsClient products={productsData} />
    );
}