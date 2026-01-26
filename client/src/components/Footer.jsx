function Footer({show = true}) {
  return (
    <>
      <div className="h-[40px]"></div>

      <footer
        className={`
          bg-[#1A73E8] text-white px-4 py-3 sm:px-6 sm:py-4 fixed bottom-0 left-0 w-full z-50
          transition-transform duration-300 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]
          ${show ? "translate-y-0" : "translate-y-full"}
        `}
      >
        <div className="flex flex-row justify-between items-center sm:items-start gap-4 max-w-7xl mx-auto">
          
          {/* Left */}
          <div className="text-left flex-1">
            <h3 className="text-base font-bold sm:text-xl">Kindim</h3>
            <p className="text-[10px] sm:text-sm leading-tight text-blue-100 mt-1 max-w-[200px] sm:max-w-md">
              Your trusted online marketplace for quality products at great prices.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold sm:text-xl">Quick Links</h3>
            {["Home", "Products", "About Us", "Contact"].map((link) => (
              <a
                key={link}
                href="#"
                className="text-xs sm:text-sm hover:underline"
              >
                {link}
              </a>
            ))}
            </div>
          </div>

      </footer>
    </>
  );
}

export default Footer;