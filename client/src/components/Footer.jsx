function Footer({ show }) {
    return (
        <>
            {/* Spacer to avoid content overlap */}
            <div className="h-[80px] sm:h-[60px]" />

            <footer
                className={`
          fixed bottom-0 left-0 w-full
          bg-[#1A73E8] text-white
          px-4 sm:px-6 py-3 sm:py-4
          transition-all duration-300
          ${show ? "opacity-100" : "opacity-0 pointer-events-none"}
        `}
            >
                <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4 max-w-7xl mx-auto">
                    {/* Left */}
                    <div className="text-center sm:text-left">
                        <h3 className="text-base sm:text-lg font-bold">Kindim</h3>
                        <p className="text-xs sm:text-sm leading-tight mt-1">
                            Your trusted online marketplace for quality products at great prices.
                        </p>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col gap-1 text-center sm:text-right">
                        <h3 className="text-base sm:text-lg font-bold">Quick Links</h3>
                        <div className="flex flex-wrap justify-center sm:justify-end gap-x-4 gap-y-1">
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
                </div>
            </footer>
        </>
    );
}
export default Footer;