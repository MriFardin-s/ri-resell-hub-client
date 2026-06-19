'use client';
import React, { useState } from 'react';
import {
    Form, Fieldset, TextField, Input, Select, Label,
    SelectTrigger, SelectValue, SelectIndicator, SelectPopover,
    ListBox, ListBoxItem, Button
} from "@heroui/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation"; 
import { addProduct } from '@/lib/actions/products';

export function AddProductForm({ user }) {
    //    console.log("Current Logged In User:", user);
//     const [seller] = useState({
//     id: "seller_md_6a3439e4", 
//     name: "Rahman Book House ", 
// });
    const router = useRouter();  
    const [previews, setPreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCondition, setSelectedCondition] = useState("");
    const [errors, setErrors] = useState({});

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        const maxSize = 5 * 1024 * 1024;

        const validFiles = files.filter(file => {
            if (file.size > maxSize) {
                alert(`File "${file.name}" is too large! Please upload images under 5MB.`);
                return false;
            }
            return true;
        });

        const newPreviews = validFiles.map(file => ({
            file: file,
            url: URL.createObjectURL(file),
            id: Math.random().toString(36).substr(2, 9)
        }));

        setPreviews((prev) => [...prev, ...newPreviews].slice(0, 3));
        if (newPreviews.length > 0) {
            setErrors(prev => ({ ...prev, images: null }));
        }
    };

    const removeImage = (id) => {
        setPreviews((prev) => {
            const updated = prev.filter((img) => img.id !== id);
            if (updated.length === 0) {
                setErrors(prevErr => ({ ...prevErr, images: "At least one product image is required" }));
            }
            return updated;
        });
    };

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
        if (!rawData.title) newErrors.title = "Product title is required";
        if (!rawData.description) newErrors.description = "Description is required";
        if (!categoryValue) newErrors.category = "Category is required";
        if (!conditionValue) newErrors.condition = "Condition is required";
        if (!rawData.price) newErrors.price = "Price is required";
        if (!rawData.stock) newErrors.stock = "Stock quantity is required";
        if (previews.length === 0) newErrors.images = "At least one product image is required";

        if (!rawData.country) newErrors.country = "Country is required";
        if (!rawData.address) newErrors.address = "Address is required";
        if (!rawData.phone) newErrors.phone = "Phone number is required";

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        setErrors({});

        try {
            const uploadPromises = previews.map(async (img) => {
                const imgFormData = new FormData();
                imgFormData.append('image', img.file);

                const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
                    method: 'POST',
                    body: imgFormData
                });
                const result = await response.json();
                return result.success ? result.data.url : null;
            });

            const uploadedUrls = await Promise.all(uploadPromises);
            const imageUrls = uploadedUrls.filter(url => url !== null);

            if (imageUrls.length === 0 && previews.length > 0) {
                toast.error("Failed to upload images. Please try again.");
                setIsLoading(false);
                return;
            }

            const newProductData = {
                ...rawData,
                category: categoryValue,
                condition: conditionValue,
                sellerId: user?._id || user?.id,
                price: Number(rawData.price),
                stock: Number(rawData.stock),
                status: "pending",
                images: imageUrls
            };

            // console.log("Submitting product data:", newProductData);

            const res = await addProduct(newProductData);

            if (res.insertedId || res.success) {
                toast.success("Product created successfully!");
                e.target.reset();
                setPreviews([]);
                setSelectedCategory("");
                setSelectedCondition("");
                router.push("/dashboard/seller/products");
            } else {
                toast.error(res.message || "Failed to create product");
                setIsLoading(false);
            }
        } catch (error) {
            console.error("Something went wrong:", error);
            toast.error("An unexpected error occurred.");
            setIsLoading(false);
        }
    }; 
    return (
        <div className="max-w-2xl mx-auto p-6 bg-neutral-950 border border-neutral-900 rounded-2xl">
            <h2 className="text-xl font-black text-white mb-6">ADD NEW PRODUCT</h2>

            <Form onSubmit={handleSubmit} className="flex flex-col gap-6" validationErrors={errors} validationBehavior='aria'>
                <Fieldset className="flex flex-col gap-5">

                    <div className="flex flex-col gap-4">
                        <Label className="text-sm font-medium text-gray-400">Product Images (Upload up to 3)</Label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className={`w-full p-3 rounded-xl bg-neutral-900 border text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-black hover:file:bg-yellow-500 cursor-pointer ${errors.images ? 'border-red-500' : 'border-neutral-800'}`}
                        />
                        {errors.images && <p className="text-xs text-red-500 pl-1">{errors.images}</p>}

                        <div className="flex gap-2 mt-2">
                            {previews.map((img) => (
                                <div key={img.id} className="relative w-20 h-20">
                                    <img src={img.url} alt="preview" className="w-full h-full object-cover rounded-lg border border-neutral-800" />
                                    <button
                                        type="button"
                                        onClick={() => removeImage(img.id)}
                                        className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full size-6 flex items-center justify-center hover:bg-red-700 transition-all z-10"
                                    >
                                        <span className="text-[10px]">✕</span>
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <TextField isInvalid={!!errors.title} errorMessage={errors.title} className="w-full flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-gray-400 pl-1">Product Title</Label>
                        <Input
                            name="title"
                            placeholder="e.g. Nike Air Jordan 1"
                            className="w-full px-3 h-11 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                        />
                    </TextField>

                    <TextField isInvalid={!!errors.description} className="w-full flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-gray-400 pl-1">Description</Label>
                        <textarea
                            name="description"
                            placeholder="Describe your product..."
                            className="w-full p-3 h-28 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all resize-none"
                        />
                        {errors.description && <p className="text-xs text-red-500 pl-1">{errors.description}</p>}
                    </TextField>

                    <Select isInvalid={!!errors.category} errorMessage={errors.category} selectedKey={selectedCategory} onSelectionChange={setSelectedCategory} name="category" placeholder="Select a category">
                        <Label className="text-sm font-medium text-gray-400">Category</Label>
                        <SelectTrigger className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-white mt-1.5">
                            <SelectValue />
                            <SelectIndicator />
                        </SelectTrigger>
                        <SelectPopover className="bg-neutral-950 border border-neutral-800 w-[var(--trigger-width)] rounded-xl mt-1">
                            <ListBox className="p-2 space-y-1">
                                <ListBoxItem id="electronics" className="p-3 text-white hover:bg-neutral-800 rounded-lg cursor-pointer">Electronics</ListBoxItem>
                                <ListBoxItem id="phones" className="p-3 text-white hover:bg-neutral-800 rounded-lg cursor-pointer">Phones</ListBoxItem>
                                <ListBoxItem id="vehicles" className="p-3 text-white hover:bg-neutral-800 rounded-lg cursor-pointer">Vehicles</ListBoxItem>
                                <ListBoxItem id="furniture" className="p-3 text-white hover:bg-neutral-800 rounded-lg cursor-pointer">Furniture</ListBoxItem>
                                <ListBoxItem id="books" className="p-3 text-white hover:bg-neutral-800 rounded-lg cursor-pointer">Books</ListBoxItem>
                                <ListBoxItem id="cameras" className="p-3 text-white hover:bg-neutral-800 rounded-lg cursor-pointer">Cameras</ListBoxItem>
                                <ListBoxItem id="fashion" className="p-3 text-white hover:bg-neutral-800 rounded-lg cursor-pointer">Fashion</ListBoxItem>
                                <ListBoxItem id="home" className="p-3 text-white hover:bg-neutral-800 rounded-lg cursor-pointer">Home & Living</ListBoxItem>
                            </ListBox>
                        </SelectPopover>
                    </Select>

                    <Select isInvalid={!!errors.condition} errorMessage={errors.condition} selectedKey={selectedCondition} onSelectionChange={setSelectedCondition} name="condition" placeholder="Select condition">
                        <Label className="text-sm font-medium text-gray-400">Condition</Label>
                        <SelectTrigger className="w-full bg-neutral-900 border border-neutral-800 p-3 rounded-xl text-white mt-1.5">
                            <SelectValue />
                            <SelectIndicator />
                        </SelectTrigger>
                        <SelectPopover className="bg-neutral-950 border border-neutral-800 w-[var(--trigger-width)] rounded-xl mt-1">
                            <ListBox className="p-2 space-y-1">
                                <ListBoxItem id="used" className="p-3 text-white hover:bg-neutral-800 rounded-lg cursor-pointer">Used</ListBoxItem>
                                <ListBoxItem id="like-new" className="p-3 text-white hover:bg-neutral-800 rounded-lg cursor-pointer">Like New</ListBoxItem>
                                <ListBoxItem id="refurbished" className="p-3 text-white hover:bg-neutral-800 rounded-lg cursor-pointer">Refurbished</ListBoxItem>
                            </ListBox>
                        </SelectPopover>
                    </Select>

                    <div className="grid grid-cols-2 gap-4">
                        <TextField isInvalid={!!errors.price} errorMessage={errors.price} className="w-full flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-gray-400 pl-1">Price ($)</Label>
                            <Input
                                name="price"
                                type="number"
                                placeholder="0.00"
                                className="w-full px-3 h-11 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                            />
                        </TextField>

                        <TextField isInvalid={!!errors.stock} errorMessage={errors.stock} className="w-full flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-gray-400 pl-1">Stock Quantity</Label>
                            <Input
                                name="stock"
                                type="number"
                                placeholder="1"
                                className="w-full px-3 h-11 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                            />
                        </TextField>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <TextField isInvalid={!!errors.country} errorMessage={errors.country} className="w-full flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-gray-400 pl-1">Country</Label>
                            <Input
                                name="country"
                                placeholder="e.g. Bangladesh"
                                className="w-full px-3 h-11 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                            />
                        </TextField>

                        <TextField isInvalid={!!errors.phone} errorMessage={errors.phone} className="w-full flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-gray-400 pl-1">Phone</Label>
                            <Input
                                name="phone"
                                placeholder="e.g. +88017..."
                                className="w-full px-3 h-11 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                            />
                        </TextField>
                    </div>

                    <TextField isInvalid={!!errors.address} errorMessage={errors.address} className="w-full flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-gray-400 pl-1">Address</Label>
                        <Input
                            name="address"
                            placeholder="e.g. Mirpur, Dhaka"
                            className="w-full px-3 h-11 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                        />
                    </TextField>

                </Fieldset>

                <div className="flex justify-end gap-3 mt-4">
                    <Button variant="flat" className="text-gray-400">Cancel</Button>
                    <Button type="submit" isLoading={isLoading} className="bg-yellow-400 text-black font-bold">Create Product</Button>
                </div>
            </Form>
        </div>
    );
}