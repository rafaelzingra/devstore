'use client'

import { createContext, ReactNode, useContext, useState } from "react";


interface CartItem {
    productId: number
    quantity: number
}

interface CartContextType {
    items: CartItem[]
    addToCart: (productId: number) => void
}

const CartContext = createContext({} as CartContextType)

export function CartProvider({ children }: { children: ReactNode }) {

    const [cartItems, setCartItems] = useState<CartItem[]>([])

    function addToCart(productId: number) {
        
        setCartItems(prevState => {            
            
            const productInCart = prevState.findIndex(item => item.productId === productId)
            
            if (productInCart >= 0) {

                prevState[productInCart].quantity += 1
                return [...prevState]
            }

            return [...prevState, { productId, quantity: 1 }]
        })
    }

    return (
        <CartContext.Provider value={{ items: cartItems, addToCart }}>
            {children}
        </CartContext.Provider>
    )
}

export const useCart = () => useContext(CartContext)