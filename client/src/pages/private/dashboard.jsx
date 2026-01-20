import { useState, useEffect } from "react";
import logoIcon from "../../assets/icons/logo-icon.png";
import AdsBoard from "../../components/ads.jsx";
import Categories from "../../components/catagaries.jsx";
import ProductGrid from "../../components/ProductGrid.jsx";
import Products from "../../data/Product.js";

/* ================= HEADER ================= */
function Header({ show }) {
  return (
    <header
      className={`
        flex items-center gap-4 px-6 py-3 bg-[#1A73E8]
        fixed top-0 left-0 w-full z-[9999]
        sm:px-8 sm:py-4 md:px-10
        transition-transform duration-300
        ${show ? "translate-y-0" : "-translate-y-full"}
      `}
    >
      <img
        src={logoIcon}
        alt="logo"
        className="h-10 w-10 sm:h-14 sm:w-14 md:h-20 md:w-20 object-contain"
      />

      <span className="text-white font-bold text-lg sm:text-2xl md:text-3xl">
        Kindim
      </span>

      <form className="ml-10 flex flex-1 max-w-xl relative">
        <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"></i>
        <input
          type="text"
          placeholder="Search products..."
          className="w-full px-4 py-2 pl-12 rounded-md text-black outline-none"
        />
      </form>
     <button
  className=" ml-60 w-10 h-10 rounded-full flex items-center justify-center
         bg-gray-100 hover:bg-gray-200
         transition duration-200"
>
</button>
<button
  className="w-10 h-10 rounded-full flex items-center justify-center
         bg-gray-100 hover:bg-gray-200
         transition duration-200"
>
</button>
<button
  className=" w-10 h-10 rounded-full flex items-center justify-center
         bg-gray-100 hover:bg-gray-200
         transition duration-200"
>
</button>



      <button className="ml-auto bg-[#3d87ff] text-black font-semibold text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 rounded-md shadow hover:bg-gray-100 active:scale-95 transition">
        Logout
      </button>
      
    </header>
  );
}

/* ================= FOOTER ================= */
function Footer({ show }) {
  return (
    <>
      <div className="h-[40px]" />
      <footer
        className={`
          bg-[#1A73E8] text-white px-6 py-4
          fixed bottom-0 left-0 w-full
          transition-all duration-300
          ${show ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
      >
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* Left */}
          <div>
            <h3 className="text-lg font-bold sm:text-xl">Kindim</h3>
            <p className="text-xs sm:text-sm">
              Your trusted online marketplace for quality products at great prices.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold sm:text-xl">Quick Links</h3>
            {["Home", "Products", "About Us", "Contact"].map((link) => (
              <a key={link} href="#" className="text-xs sm:text-sm hover:underline">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}

/* ================= DASHBOARD ================= */
export default function DashBoard() {
  const [showHeader, setShowHeader] = useState(true);
  const [showFooter, setShowFooter] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    function handleScroll() {
      const currentScroll = window.scrollY;

      // Header hide/show
      setShowHeader(currentScroll < lastScrollY);

      // Footer show only at bottom
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
      <Header show={showHeader} />

      {/* MAIN CONTENT */}
      <main className="mt-[112px] px-6 bg-white">
        <div className="h-[2000px]">
          <div>
            <div className="">
                <div className="h-96 w-full bg-red-100 rounded-lg flex ">
                    <AdsBoard/>

                </div>
                <div>
                  <Categories/>
                </div>
              
                
                   <div className="mb-4 text-gray-600">
                
                  <ProductGrid/>
                </div>
        
            </div>


          </div>
        </div>
      </main>

      {/* FOOTER */}
      <Footer show={showFooter} />
    </div>
  );
}
