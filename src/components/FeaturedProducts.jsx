
import { getFeaturedProducts } from "@/lib/api/getFeaturedProducts";

import FeaturedProductsClient from "./FeaturedProductsClient";



export default async function FeaturedProducts() {
    const products = await getFeaturedProducts();

    return (
  <FeaturedProductsClient  products={products}  />
    );
}