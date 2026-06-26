import { getPopularCategories } from "@/lib/api/getPopularCategories";
import { Card } from "@heroui/react";
import Link from "next/link";


export default async function PopularCategories() {
  const categories = await getPopularCategories();
  console.log(categories);
console.log(typeof categories);
console.log(Array.isArray(categories));

  return (
    <section className="max-w-7xl mx-auto py-16 px-4">
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-black">
          Popular Categories
        </h2>
        <p className="text-neutral-500 mt-2">
          Browse products by category
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-5">
        {categories.map((item) => (
          <Link
            key={item.category}
            href={`/products?category=${item.category}`}
          >
            <Card className="hover:-translate-y-1 transition-all duration-300 border border-amber-100 hover:border-yellow-400 shadow-sm hover:shadow-lg rounded-2xl">
              <Card.Content className="py-8 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-yellow-100 flex items-center justify-center text-3xl">
                  📦
                </div>

                <h3 className="font-bold text-lg text-center">
                  {item.category}
                </h3>

                <p className="text-sm text-neutral-500">
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