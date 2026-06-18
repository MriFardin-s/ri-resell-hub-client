'use client';
import React, { useState } from 'react';
import {
    Form, Fieldset, TextField, Input, TextArea, Select, Label,
    SelectTrigger, SelectValue, SelectIndicator, SelectPopover,
    ListBox, ListBoxItem, Button
} from "@heroui/react"; 

export function AddProductForm() {
    const [previews, setPreviews] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedCondition, setSelectedCondition] = useState("");

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
    };

    const removeImage = (id) => {
        setPreviews((prev) => prev.filter((img) => img.id !== id));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const formData = new FormData(e.currentTarget);

        try {
            const imageUrls = [];
            for (const img of previews) {
                const imgFormData = new FormData();
                imgFormData.append('image', img.file);

                const response = await fetch(`https://api.imgbb.com/1/upload?key=${process.env.NEXT_PUBLIC_IMGBB_API_KEY}`, {
                    method: 'POST',
                    body: imgFormData
                });
                const result = await response.json();
                if (result.success) {
                    imageUrls.push(result.data.url);
                }
            }

            const productData = {
                title: formData.get("title"),
                description: formData.get("description"),
                category: selectedCategory,
                condition: selectedCondition,
                price: formData.get("price"),
                stock: formData.get("stock"),
                images: imageUrls
            };

            const res = await fetch('/api/products', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(productData)
            });

            if (res.ok) {
                alert("Product created successfully!");
                setPreviews([]);
            }
        } catch (error) {
            console.error(error);
            alert("Failed to create product.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-6 bg-neutral-950 border border-neutral-900 rounded-2xl">
            <h2 className="text-xl font-black text-white mb-6">ADD NEW PRODUCT</h2>

            <Form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <Fieldset className="flex flex-col gap-5">
                 
                    <div className="flex flex-col gap-4">
                        <Label className="text-sm font-medium text-gray-400">Product Images (Upload up to 3)</Label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                            className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-yellow-400 file:text-black hover:file:bg-yellow-500 cursor-pointer"
                        />
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

                    
                    <TextField className="w-full flex flex-col gap-1.5">
                        <Label className="text-sm font-medium text-gray-400 pl-1">Product Title</Label>
                        <Input
                            name="title"
                            placeholder="e.g. Nike Air Jordan 1"
                            required
                            className="w-full px-3 h-11 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                        />
                    </TextField>

                  
                    <TextArea
                        name="description"
                        label="Description"
                        placeholder="Describe your product..."
                        className="w-full text-white"
                        style={{ color: 'white', backgroundColor: '#171717' }}
                    />

                    {/* ক্যাটাগরি সিলেক্ট (প্লেসহোল্ডার ফিক্সড) */}
                    <Select selectedKey={selectedCategory} onSelectionChange={setSelectedCategory} name="category" placeholder="Select a category">
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

                  
                    <Select selectedKey={selectedCondition} onSelectionChange={setSelectedCondition} name="condition" placeholder="Select condition">
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
                        <TextField className="w-full flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-gray-400 pl-1">Price ($)</Label>
                            <Input
                                name="price"
                                type="number"
                                placeholder="0.00"
                                required
                                className="w-full px-3 h-11 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                            />
                        </TextField>

                        <TextField className="w-full flex flex-col gap-1.5">
                            <Label className="text-sm font-medium text-gray-400 pl-1">Stock Quantity</Label>
                            <Input
                                name="stock"
                                type="number"
                                placeholder="1"
                                required
                                className="w-full px-3 h-11 rounded-xl bg-neutral-900 border border-neutral-800 text-white placeholder:text-gray-500 text-sm outline-none focus:border-yellow-400/50 transition-all"
                            />
                        </TextField>
                    </div>
                </Fieldset>

                <div className="flex justify-end gap-3 mt-4">
                    <Button variant="flat" className="text-gray-400">Cancel</Button>
                    <Button type="submit" isLoading={isLoading} className="bg-yellow-400 text-black font-bold">Create Product</Button>
                </div>
            </Form>
        </div>
    );
}