'use client';
import { AddProductForm } from "@/components/dashboard/AddProductForm"; // তোমার কম্পোনেন্টের সঠিক পাথ দাও

export default function NewProductPage() {
  return (
    <div className="p-8">
      <AddProductForm />
    </div>
  );
}