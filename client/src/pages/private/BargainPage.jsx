import { BargainForm } from "../../components/BargainForm";
import { ProductDisplay } from "../../components/ProductDisplay";
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useApi } from "../../hooks/useAPI";
import Header from "../../components/Header";
import Footer from "../../components/Footer";

function BargainPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { callApi } = useApi();

  const [product, setProduct] = useState(location.state?.product ?? null);
  const [loadingProduct, setLoadingProduct] = useState(!location.state?.product);
  const [submitting, setSubmitting] = useState(false);

  const imageUrl = useMemo(() => {
    if (!product?.image) return "";
    return product.image?.startsWith("http")
      ? product.image
      : `http://localhost:5000/uploads/${product.image}`;
  }, [product]);

  useEffect(() => {
    const loadProduct = async () => {
      if (product) return;
      try {
        setLoadingProduct(true);
        const res = await callApi("GET", `/api/products/${id}`);
        setProduct(res?.data ?? res);
      } catch (err) {
        console.error("Failed to load product for bargain:", err);
        toast.error("Failed to load product for bargain.");
      } finally {
        setLoadingProduct(false);
      }
    };
    loadProduct();
  }, [callApi, id, product]);

  const handleSubmit = async (data) => {
    if (!product) {
      toast.error("Product not loaded yet.");
      return;
    }

    const proposed = parseFloat(data.proposedPrice);
    if (Number.isNaN(proposed) || proposed <= 0) {
      toast.error("Please enter a valid proposed price.");
      return;
    }

    try {
      setSubmitting(true);
      await callApi("POST", "/api/bargains", {
        productId: product.id,
        productName: product.name,
        originalPrice: product.price,
        proposedPrice: proposed,
        reason: data.reason,
      });
      toast.success("Bargain offer submitted!");
      navigate(`/product/${product.id}`);
    } catch (err) {
      console.error("Bargain submit failed:", err);
      toast.error(err?.message || "Failed to submit bargain.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
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
          {loadingProduct ? (
            <div className="text-center py-8 text-gray-600">Loading product...</div>
          ) : product ? (
            <ProductDisplay 
              productName={product.name} 
              originalPrice={`Rs. ${product.price}`} 
              image={imageUrl} 
            />
          ) : (
            <div className="text-center py-8 text-red-600">Product not found.</div>
          )}
        </div>

        <BargainForm 
          onSubmit={submitting ? () => {} : handleSubmit}
          onCancel={handleCancel}
        />
      </div>
    </div>
    <Footer />
    </>
  );
}

export default BargainPage;