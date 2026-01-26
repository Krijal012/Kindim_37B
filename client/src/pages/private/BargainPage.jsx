import { BargainForm } from "../../components/BargainForm";
import { ProductDisplay } from "../../components/ProductDisplay";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";

function BargainPage() {
  const handleSubmit = (data) => {
    alert(`Offer submitted!\nPrice: $${data.proposedPrice}\nReason: ${data.reason || 'No reason provided'}`);
  };

  const handleCancel = () => {
    alert('Offer cancelled');
  };

  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 pt-24 pb-10 px-4">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-2">Request a Lower Price</h1>
        <p className="text-center text-gray-600 text-sm sm:text-base mb-6">
          Found something you love but want to make a better offer? Use the form below to submit your proposed price for the product.
        </p>

        <div className="mb-6">
          <ProductDisplay 
            productName="Product Name" 
            originalPrice="Price" 
            image="" 
          />
        </div>

        <BargainForm 
          onSubmit={handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
    <Footer />
    </>
  );
}

export default BargainPage;