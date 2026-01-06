import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export interface CartItem {
    variantId: string
    productId: string
    title: string
    price: number
    image: string
    size: string
    color: string
    quantity: number
}

interface CartState {
    items: CartItem[]
    isOpen: boolean
    addItem: (item: CartItem) => void
    removeItem: (variantId: string) => void
    updateQuantity: (variantId: string, quantity: number) => void
    clearCart: () => void
    toggleCart: () => void
    openCart: () => void
    closeCart: () => void
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,
            addItem: (newItem) => {
                const items = get().items
                const existingItem = items.find((item) => item.variantId === newItem.variantId)

                if (existingItem) {
                    set({
                        items: items.map((item) =>
                            item.variantId === newItem.variantId
                                ? { ...item, quantity: item.quantity + newItem.quantity }
                                : item
                        ),
                        isOpen: true
                    })
                } else {
                    set({ items: [...items, newItem], isOpen: true })
                }
            },
            removeItem: (variantId) => {
                set({ items: get().items.filter((item) => item.variantId !== variantId) })
            },
            updateQuantity: (variantId, quantity) => {
                set({
                    items: get().items.map((item) =>
                        item.variantId === variantId ? { ...item, quantity } : item
                    ),
                })
            },
            clearCart: () => set({ items: [] }),
            toggleCart: () => set({ isOpen: !get().isOpen }),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),
        }),
        {
            name: 'crocknest-cart',
            storage: createJSONStorage(() => localStorage),
            // Skip hydrating 'isOpen' to avoid opening cart on page load
            partialize: (state) => ({ items: state.items }),
        }
    )
)
