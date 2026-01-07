"use client"

import { Category, Product, ScarcityLevel } from "@prisma/client"
import { useActionState } from "react"
import Link from "next/link"

interface ProductFormProps {
    categories: Category[]
    product?: Product
    action: (prevState: any, formData: FormData) => Promise<any>
}

const initialState = {
    success: false,
    errors: {} as Record<string, string[]>
}

export function ProductForm({ categories, product, action }: ProductFormProps) {
    const [state, formAction, pending] = useActionState(action, initialState)

    const inputClasses = "w-full px-4 py-2.5 rounded-lg border border-gray-300 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary focus:border-primary transition-shadow"
    const labelClasses = "block text-xs font-bold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-1.5"
    const errorClasses = "text-red-500 text-xs font-bold mt-1"

    return (
        <form action={formAction} className="flex flex-col gap-6 bg-white dark:bg-gray-900 rounded-xl border border-primary/30 shadow-lg p-8">
            <div className="flex flex-col gap-6">
                {/* Title */}
                <div>
                    <label htmlFor="title" className={labelClasses}>Title</label>
                    <input
                        id="title"
                        name="title"
                        defaultValue={product?.title}
                        className={inputClasses}
                        placeholder="e.g. Neon Graphic Tee"
                    />
                    {state.errors?.title && <p className={errorClasses}>{state.errors.title[0]}</p>}
                </div>

                {/* Description */}
                <div>
                    <label htmlFor="description" className={labelClasses}>Description</label>
                    <textarea
                        id="description"
                        name="description"
                        defaultValue={product?.description}
                        className={`${inputClasses} min-h-[120px]`}
                        placeholder="Product description..."
                    />
                    {state.errors?.description && <p className={errorClasses}>{state.errors.description[0]}</p>}
                </div>

                {/* Price & Scarcity Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label htmlFor="basePrice" className={labelClasses}>Price ($)</label>
                        <div className="relative">
                            <span className="absolute left-3 top-2.5 text-gray-400 font-bold">$</span>
                            <input
                                id="basePrice"
                                name="basePrice"
                                type="number"
                                step="0.01"
                                defaultValue={product ? Number(product.basePrice) : ""}
                                className={`${inputClasses} pl-8`}
                                placeholder="0.00"
                            />
                        </div>
                        {state.errors?.basePrice && <p className={errorClasses}>{state.errors.basePrice[0]}</p>}
                    </div>

                    <div>
                        <label htmlFor="scarcityLevel" className={labelClasses}>Scarcity Level</label>
                        <select
                            id="scarcityLevel"
                            name="scarcityLevel"
                            defaultValue={product?.scarcityLevel || "MEDIUM"}
                            className={inputClasses}
                        >
                            <option value="LOW">Low (Common)</option>
                            <option value="MEDIUM">Medium</option>
                            <option value="HIGH">High (Rare)</option>
                        </select>
                    </div>
                </div>

                {/* Category */}
                <div>
                    <label htmlFor="categoryId" className={labelClasses}>Category</label>
                    <select
                        id="categoryId"
                        name="categoryId"
                        defaultValue={product?.categoryId || ""}
                        className={inputClasses}
                    >
                        <option value="" disabled>Select a Category</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    {state.errors?.categoryId && <p className={errorClasses}>{state.errors.categoryId[0]}</p>}
                </div>

                {/* Images Section */}
                <div className="pt-6 border-t border-gray-100 dark:border-gray-800">
                    <h3 className="text-sm font-black uppercase tracking-wider text-gray-900 dark:text-white mb-4">Product Images (URLs)</h3>
                    <div className="grid grid-cols-1 gap-4">
                        {[0, 1, 2].map((index) => (
                            <div key={index}>
                                <label className={labelClasses}>Image {index + 1} {index === 0 && "(Main)"}</label>
                                <div className="flex gap-2">
                                    <div className="flex-1">
                                        <input
                                            name={`image${index + 1}`}
                                            defaultValue={product?.images[index] || ""}
                                            placeholder="https://..."
                                            className={inputClasses}
                                        />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t border-gray-100 dark:border-gray-800 mt-2">
                <Link href="/admin/products" className="flex-1 py-3 px-4 rounded-lg border border-gray-300 bg-white text-gray-700 font-bold hover:bg-gray-50 transition-colors text-center">
                    Cancel
                </Link>
                <button
                    type="submit"
                    disabled={pending}
                    className="flex-1 py-3 px-4 rounded-lg bg-primary text-white font-bold shadow-lg shadow-primary/30 hover:bg-primary/90 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                >
                    {pending ? (
                        <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                            Saving...
                        </>
                    ) : (
                        product ? "Update Product" : "Create Product"
                    )}
                </button>
            </div>

            {state.error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-bold text-center">
                    {state.error}
                </div>
            )}
        </form>
    )
}
