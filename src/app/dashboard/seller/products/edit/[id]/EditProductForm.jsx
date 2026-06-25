'use client';

import React, { useState } from 'react';
import {
    Form, Fieldset, TextField, Input, Select, Label,
    SelectTrigger, SelectValue, SelectIndicator, SelectPopover,
    ListBox, ListBoxItem, Button
} from "@heroui/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function EditProductForm({ product }) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    
    const [selectedCategory, setSelectedCategory] = useState(product?.category || "");
    const [selectedCondition, setSelectedCondition] = useState(product?.condition || "");
    const [errors, setErrors] = useState({});

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);
        const rawData = Object.fromEntries(formData.entries());

      
        const categoryValue = selectedCategory && typeof selectedCategory === 'object'
            ? (selectedCategory.currentKey || Array.from(selectedCategory)[0] || "")
            : selectedCategory;

        const conditionValue = selectedCondition && typeof selectedCondition === 'object'
            ? (selectedCondition.currentKey || Array.from(selectedCondition)[0] || "")
            : selectedCondition;

        const newErrors = {};
        if (rawData.title?.trim() === "") newErrors.title = "Product title cannot be empty";
        if (rawData.description?.trim() === "") newErrors.description = "Description cannot be empty";
        if (!categoryValue) newErrors.category = "Category cannot be empty";
        if (!conditionValue) newErrors.condition = "Condition cannot be empty";
        if (rawData.price?.trim() === "") newErrors.price = "Price cannot be empty";
        if (rawData.stock?.trim() === "") newErrors.stock = "Stock quantity cannot be empty";
        if (rawData.country?.trim() === "") newErrors.country = "Country cannot be empty";
        if (rawData.address?.trim() === "") newErrors.address = "Address cannot be empty";
        if (rawData.phone?.trim() === "") newErrors.phone = "Phone number cannot be empty";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        setErrors({});

        try {
            const updatedProductData = {
                ...rawData,
                category: categoryValue,
                condition: conditionValue,
                price: Number(rawData.price),
                stock: Number(rawData.stock),
            };

            const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products/${product._id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedProductData),
            });

            const data = await res.json();

            if (data.success || res.ok) {
                toast.success('Product updated successfully');
                router.push("/dashboard/seller/products");
                router.refresh();
            } else {
                toast.error(data.message || 'Update failed');
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Update error:", error);
            toast.error('An unexpected error occurred.');
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-900 rounded-2xl shadow-sm dark:shadow-none transition-colors">
            <h2 className="text-xl font-black text-neutral-900 dark:text-white mb-6">EDIT PRODUCT</h2>

            <Form onSubmit={handleSubmit} className="flex flex-col gap-6" validationErrors={errors} validationBehavior='aria'>
                <Fieldset className="flex flex-col gap-5">

                    <TextField defaultValue={product?.title} isInvalid={!!errors.title} errorMessage={errors.title} className="w-full flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-neutral-500 dark:text-gray-400 pl-1">Product Title</Label>
                        <Input
                            name="title"
                            placeholder="e.g. Nike Air Jordan 1"
                            className="w-full px-3 h-11 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                        />
                    </TextField>

                    {/* Description */}
                    <TextField defaultValue={product?.description} isInvalid={!!errors.description} className="w-full flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-neutral-500 dark:text-gray-400 pl-1">Description</Label>
                        <textarea
                            name="description"
                            placeholder="Describe your product..."
                            className="w-full p-3 h-28 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all resize-none"
                        />
                        {errors.description && <p className="text-xs text-red-500 pl-1">{errors.description}</p>}
                    </TextField>

                    {/* Category */}
                    <Select isInvalid={!!errors.category} errorMessage={errors.category} selectedKey={selectedCategory} onSelectionChange={setSelectedCategory} name="category" placeholder="Select a category">
                        <Label className="text-sm font-medium text-neutral-500 dark:text-gray-400">Category</Label>
                        <SelectTrigger className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-3 rounded-xl text-neutral-900 dark:text-white mt-1.5 transition-colors">
                            <SelectValue />
                            <SelectIndicator />
                        </SelectTrigger>
                        <SelectPopover className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 w-[var(--trigger-width)] rounded-xl mt-1">
                            <ListBox className="p-2 space-y-1">
                                <ListBoxItem id="electronics" className="p-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer">Electronics</ListBoxItem>
                                <ListBoxItem id="phones" className="p-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer">Phones</ListBoxItem>
                                <ListBoxItem id="vehicles" className="p-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer">Vehicles</ListBoxItem>
                                <ListBoxItem id="furniture" className="p-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer">Furniture</ListBoxItem>
                                <ListBoxItem id="books" className="p-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer">Books</ListBoxItem>
                                <ListBoxItem id="cameras" className="p-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer">Cameras</ListBoxItem>
                                <ListBoxItem id="fashion" className="p-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer">Fashion</ListBoxItem>
                                <ListBoxItem id="home" className="p-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer">Home & Living</ListBoxItem>
                            </ListBox>
                        </SelectPopover>
                    </Select>

                    {/* Condition */}
                    <Select isInvalid={!!errors.condition} errorMessage={errors.condition} selectedKey={selectedCondition} onSelectionChange={setSelectedCondition} name="condition" placeholder="Select condition">
                        <Label className="text-sm font-medium text-neutral-500 dark:text-gray-400">Condition</Label>
                        <SelectTrigger className="w-full bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 p-3 rounded-xl text-neutral-900 dark:text-white mt-1.5 transition-colors">
                            <SelectValue />
                            <SelectIndicator />
                        </SelectTrigger>
                        <SelectPopover className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800 w-[var(--trigger-width)] rounded-xl mt-1">
                            <ListBox className="p-2 space-y-1">
                                <ListBoxItem id="used" className="p-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer">Used</ListBoxItem>
                                <ListBoxItem id="like-new" className="p-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer">Like New</ListBoxItem>
                                <ListBoxItem id="refurbished" className="p-3 text-neutral-900 dark:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-lg cursor-pointer">Refurbished</ListBoxItem>
                            </ListBox>
                        </SelectPopover>
                    </Select>

                    {/* Price and Stock */}
                    <div className="grid grid-cols-2 gap-4">
                        <TextField defaultValue={product?.price?.toString()} isInvalid={!!errors.price} errorMessage={errors.price} className="w-full flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-neutral-500 dark:text-gray-400 pl-1">Price ($)</Label>
                            <Input
                                name="price"
                                type="number"
                                placeholder="0.00"
                                className="w-full px-3 h-11 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                            />
                        </TextField>

                        <TextField defaultValue={product?.stock?.toString()} isInvalid={!!errors.stock} errorMessage={errors.stock} className="w-full flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-neutral-500 dark:text-gray-400 pl-1">Stock Quantity</Label>
                            <Input
                                name="stock"
                                type="number"
                                placeholder="1"
                                className="w-full px-3 h-11 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                            />
                        </TextField>
                    </div>

                    {/* Country and Phone */}
                    <div className="grid grid-cols-2 gap-4">
                        <TextField defaultValue={product?.country || "Bangladesh"} isInvalid={!!errors.country} errorMessage={errors.country} className="w-full flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-neutral-500 dark:text-gray-400 pl-1">Country</Label>
                            <Input
                                name="country"
                                placeholder="e.g. Bangladesh"
                                className="w-full px-3 h-11 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                            />
                        </TextField>

                        <TextField defaultValue={product?.phone} isInvalid={!!errors.phone} errorMessage={errors.phone} className="w-full flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-neutral-500 dark:text-gray-400 pl-1">Phone</Label>
                            <Input
                                name="phone"
                                placeholder="e.g. +88017..."
                                className="w-full px-3 h-11 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                            />
                        </TextField>
                    </div>

                    {/* Address */}
                    <TextField defaultValue={product?.address} isInvalid={!!errors.address} errorMessage={errors.address} className="w-full flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-neutral-500 dark:text-gray-400 pl-1">Address</Label>
                        <Input
                            name="address"
                            placeholder="e.g. Mirpur, Dhaka"
                            className="w-full px-3 h-11 rounded-xl bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                        />
                    </TextField>

                </Fieldset>

                {/* Form Actions */}
                <div className="flex justify-end gap-3 mt-4">
                    <Button 
                        type="button" 
                        variant="flat" 
                        onClick={() => router.push("/dashboard/seller/products")}
                        className="text-neutral-500 dark:text-gray-400 bg-neutral-100 dark:bg-neutral-900 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                    >
                        Cancel
                    </Button>
                    <Button 
                        type="submit" 
                        isLoading={isLoading} 
                        className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold transition-colors"
                    >
                        Update Product
                    </Button>
                </div>
            </Form>
        </div>
    );
}