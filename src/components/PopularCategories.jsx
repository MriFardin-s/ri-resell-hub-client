import { getPopularCategories } from "@/lib/api/getPopularCategories";
import { Card } from "@heroui/react";
import Link from "next/link";

export default async function PopularCategories() {
  const categoriesData = await getPopularCategories();




  const safeCategories = categoriesData?.categories && Array.isArray(categoriesData.categories)
    ? categoriesData.categories
    : (Array.isArray(categoriesData) ? categoriesData : []);

  
  if (safeCategories.length === 0) {
    return (
      <section className="max-w-7xl mx-auto py-16 px-4 text-center">
        <p className="text-neutral-500 dark:text-neutral-400">No categories available at the moment.</p>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      {/* Header - Dark mode support added */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black text-neutral-900 dark:text-white">
          Popular Categories
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 mt-2">
          Browse products by category
        </p>
      </div>



      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">

        {safeCategories.map((item) => (
          <Link
            key={item.category}
            href={`/products?category=${item.category}`}
          >
            <Card className="hover:-translate-y-1 transition-all duration-300 border border-amber-100 dark:border-neutral-800 hover:border-yellow-400 dark:hover:border-yellow-500 shadow-sm hover:shadow-lg rounded-2xl bg-white dark:bg-neutral-900">
              <Card.Content className="py-8 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-950/40 flex items-center justify-center text-3xl">
                  📦
                </div>

                {/* Typography fixed for dark mode */}
                <h3 className="font-bold text-lg text-center text-neutral-900 dark:text-white capitalize">
                  {item.category}
                </h3>

                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {item.totalProducts} Products
                </p>
              </Card.Content>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
}