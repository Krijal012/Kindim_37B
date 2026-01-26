import { useState } from 'react';
import OrderCard from '../../components/OrderCard';
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

function OrderHistoryPage() {
  const [searchTerm, setSearchTerm] = useState('');
  
  const orders = [
    { id: 1, name: 'Product Name', price: 'Price', image: '' },
    { id: 2, name: 'Product Name', price: 'Price', image: '' },
  ];

  const handleBuyAgain = (order) => {
    alert(`Buying again: ${order.name}`);
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Order History</h1>

        <div className="space-y-4">
          {orders.map(order => (
            <OrderCard 
              key={order.id}
              order={order}
              onBuyAgain={handleBuyAgain}
            />
          ))}
        </div>
      </div>
    </div>
    <Footer />
    </>
  );
}

export default OrderHistoryPage;