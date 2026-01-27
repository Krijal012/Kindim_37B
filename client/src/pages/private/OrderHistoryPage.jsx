import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Orders from "../../components/Orders";

export default function OrderHistoryPage({ onLogout }) {
  return (
    <>
      <Header onLogout={onLogout} />
      <main className="min-h-screen bg-gray-50 pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <Orders />
        </div>
      </main>
      <Footer />
    </>
  );
}