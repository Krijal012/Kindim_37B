import { useState } from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { CartItem } from "../../components/WishCart";

function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: "Facewash", image: "/cloth.png", price: 450 },
    { id: 2, name: "Facewash", image: "/product1.jpg", price: 450 },
    { id: 3, name: "Facewash", image: "/product1.jpg", price: 450 },
    { id: 4, name: "Facewash", image: "/product1.jpg", price: 550 },
  ]);

  const handleRemove = (id) => {
    setWishlistItems(items => items.filter(item => item.id !== id));
  };

  const handleAddToCart = (item) => {
    console.log("Added to cart:", item);
    handleRemove(item.id);
  };

  return (
    <div className="bg-gray-300 min-h-screen">
      <Header show={true} />

      <main className="pt-28 pb-24 px-4">
        <h1 className="text-3xl font-bold mb-8 text-center text-black">
          Your Wishlist
        </h1>

        {wishlistItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistItems.map(item => (
              <CartItem
                key={item.id}
                item={item}
                onRemove={handleRemove}
                addItemToCart={handleAddToCart}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg">
            Your wishlist is empty.
          </p>
        )}
      </main>

      <Footer show={true} />
    </div>
  );
}

export default Wishlist;
