import { useState } from "react";
import Cart from "../../components/Cart";
import OrderSummary from "../../components/OrderSummary";

import products from "../../data/Product";
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

function CartPage(){
    const [cartItems, setCartItems] = useState([
        { ...products[0], quantity: 1 },
        { ...products[10], quantity: 2 },
        { ...products[23], quantity: 1 },
    ]);

    const updateQuantity = (id, change) => {
        setCartItems(cartItems.map(item => {
            if (item.id === id) {
                const newQuantity = item.quantity + change;
                return { ...item, quantity: Math.max(1, newQuantity) };
            }
            return item;
        }));
    };

    const handleRemove = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return(
        <>
            <Header />
            <main className="bg-gray-50 py-10 mt-20 min-h-screen">
                <div className="max-w-7xl mx-auto px-6">
                    <h1 className="text-3xl text-left font-bold text-gray-900 mb-8">Your Shopping Cart</h1>
                    
                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1">
                            <Cart 
                                cartItems={cartItems} 
                                updateQuantity={updateQuantity} 
                                handleRemove={handleRemove} 
                            />
                        </div>
                        <div className="w-full lg:w-96">
                            <OrderSummary subtotal={subtotal} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
}

export default CartPage;