export function Footer() {
  return (
    <footer
      className={`
        w-full
        bg-[#1A73E8] text-white
        px-6 py-4
      `}
    >
        <div className="flex flex-col sm:flex-row justify-between gap-4">

          {/* Left */}
          <div>
            <h3 className="text-lg font-bold sm:text-xl">Kindim</h3>
            <p className="text-xs sm:text-sm leading-tight">
              Your trusted online marketplace for quality products at great prices.
            </p>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold sm:text-xl">Quick Links</h3>

            {["Home", "Products", "About Us", "Contact"].map(link => (
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
  );
}