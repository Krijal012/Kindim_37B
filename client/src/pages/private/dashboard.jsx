import { useState, useEffect, useMemo } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import AdsBoard from "../../components/ads.jsx";
import Categories from "../../components/catagaries.jsx";
import ProductGrid from "../../components/ProductGrid.jsx";

import Products from "../../data/Product";
import getRandomProductsByCategory from "../../utils/getRandomProductsByCategory";

export default function DashBoard() {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  // ✅ Pick 1 random product from each category (runs once)
  const randomFiveProducts = useMemo(
    () => getRandomProductsByCategory(Products),
    []
  );

  useEffect(() => {
    function handleScroll() {
      const currentScroll = window.scrollY;

      setShowHeader(currentScroll < lastScrollY);

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 50;

      setShowFooter(atBottom);
      setLastScrollY(currentScroll);
    }

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <Header show={showHeader} onLogout={() => console.log("Logout")} />

      {/* MAIN */}
      <main className="mt-[112px] px-6 bg-white space-y-10">
        <div className="h-96 w-full rounded-lg">
          <AdsBoard />
        </div>

        <Categories />

        {/* ✅ Random 5 products */}
        <div className="mb-10 text-gray-600">
          <ProductGrid products={randomFiveProducts} />
        </div>
      </main>

      {/* FOOTER */}
      <Footer show={showFooter} />
    </div>
  );
}
