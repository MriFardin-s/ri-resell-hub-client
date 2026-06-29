import ProductExploreSection from "@/components/products/ProductExploreSection";
import { getAllProducts } from "@/lib/api/products";

export default async function AllProductsPage({ searchParams }) {

    const filters = (await searchParams) || {};


    const filterObj = {
        ...filters,
        page: Number(filters.page) || 1,
    };


    const queryParams = new URLSearchParams();
    
 
    Object.entries(filterObj).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
            queryParams.append(key, value.toString());
        }
    });


    if (!queryParams.has("status")) {
        queryParams.append("status", "available,sold");
    }

    const queryString = queryParams.toString();

   
    const data = await getAllProducts(queryString);



    const products = data?.products && Array.isArray(data.products) ? data.products : [];
    const total = Number(data?.total) || 0;

  

    return (
        <div className="container mx-auto px-4 py-8 text-neutral-900 dark:text-neutral-100">
            <header className="mb-8 text-center">
                <h1 className="text-3xl font-bold text-neutral-900 dark:text-white">
                    Explore All Products
                </h1>

                <p className="text-neutral-500 dark:text-neutral-400 mt-2">
                    Find the best deals from trusted sellers
                </p>
            </header>

      
            <ProductExploreSection
                products={products}
                total={total}
                filters={filterObj}
            />
        </div>
    );
}