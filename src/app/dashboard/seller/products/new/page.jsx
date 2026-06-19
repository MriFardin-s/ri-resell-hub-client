import { AddProductForm } from "@/components/dashboard/AddProductForm"; 
import { getUserSession } from "@/lib/core/session";

export default async function NewProductPage() {
  const user = await getUserSession();
  return (
    <div className="p-8">
      <AddProductForm user={user} />
    </div>
  );
}