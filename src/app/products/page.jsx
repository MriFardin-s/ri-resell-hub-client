import ProductExploreSection from "@/components/products/ProductExploreSection";
import { getAllProducts } from "@/lib/api/products";

export default async function AllProductsPage({ searchParams }) {

    const filters = await searchParams;

    const filterObj = {
        ...filters,
        page: Number(filters.page) || 1,
    };

    const queryString = new URLSearchParams(filters).toString();

    const { products, total } = await getAllProducts(queryString);

    return (
        <div className="container mx-auto px-4 py-8 text-neutral-900 dark:text-neutral-100">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold">
                    Explore All Products
                </h1>

                <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                    Find the best deals from trusted sellers
                </p>
            </header>

            <ProductExploreSection
                products={products || []} 
                total={total}
                filters={filterObj}
            />
        </div>
    );
}