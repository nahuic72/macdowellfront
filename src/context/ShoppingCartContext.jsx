import React, { createContext, useContext, useState } from "react";

export const CartContext = createContext();//Creamos el contexto de la aplicación para trasmitirlo a los componentes

export const ShoppingCartProvider = ({ children }) => {

    const [cart, setCart] = useState([])

    const [totalCart, setTotalCart] = useState([{
        totalPrice: 0,
        totalQuantity: 0
    }]);

    return (
        <CartContext.Provider value={{ cart, setCart, totalCart, setTotalCart }}>
            {children}
        </CartContext.Provider>
    );

};

export function useCartContext() { //Esto es para poder acceder a ello de manera más rápida

    return useContext(CartContext);

}

