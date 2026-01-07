"use client"

import { createContext, useContext, useEffect, useState } from "react"

export interface CartItem {
    productId: string
    variantId: string
    title: string
    price: number
    image: string
    size: string
    color: string
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (item: CartItem) => void
    removeFromCart: (variantId: string) => void
    updateQuantity: (variantId: string, quantity: number) => void
    clearCart: () => void
    cartTotal: number
    cartCount: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: React.ReactNode }) {
    const [items, setItems] = useState<CartItem[]>([])
    const [isLoaded, setIsLoaded] = useState(false)

    // Load from local storage on mount
    useEffect(() => {
        const savedCart = localStorage.getItem("cart")
        if (savedCart) {
            try {
                setItems(JSON.parse(savedCart))
            } catch (e) {
                console.error("Failed to parse cart", e)
            }
        }
        setIsLoaded(true)
    }, [])

    // Save to local storage on change
    useEffect(() => {
        if (isLoaded) {
            localStorage.setItem("cart", JSON.stringify(items))
        }
    }, [items, isLoaded])

    const addToCart = (newItem: CartItem) => {
        setItems(currentItems => {
            const existingItem = currentItems.find(item => item.variantId === newItem.variantId)
            if (existingItem) {
                return currentItems.map(item =>
                    item.variantId === newItem.variantId
                        ? { ...item, quantity: item.quantity + newItem.quantity }
                        : item
                )
            }
            return [...currentItems, newItem]
        })
    }

    const removeFromCart = (variantId: string) => {
        setItems(currentItems => currentItems.filter(item => item.variantId !== variantId))
    }

    const updateQuantity = (variantId: string, quantity: number) => {
        if (quantity < 1) {
            removeFromCart(variantId)
            return
        }
        setItems(currentItems =>
            currentItems.map(item =>
                item.variantId === variantId ? { ...item, quantity } : item
            )
        )
    }

    const clearCart = () => setItems([])

    const cartTotal = items.reduce((total, item) => total + (item.price * item.quantity), 0)
    const cartCount = items.reduce((count, item) => count + item.quantity, 0)

    // Avoid hydration mismatch by waiting for load
    if (!isLoaded) return null

    return (
        <CartContext.Provider value={{ items, addToCart, removeFromCart, updateQuantity, clearCart, cartTotal, cartCount }}>
            {children}
        </CartContext.Provider>
    )
}

export function useCart() {
    const context = useContext(CartContext)
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider")
    }
    return context
}
