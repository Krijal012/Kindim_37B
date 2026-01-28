import KindimErrorImg from '../assets/Errorpage.png';

function Section() {
  const handleReload = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <section
      className="
        flex flex-col md:flex-row justify-between items-center
        px-4 sm:px-6 md:px-10 lg:px-20
        py-20 sm:py-28 md:py-32 lg:py-40 
        gap-6 sm:gap-8 md:gap-10 
        pt-16 sm:pt-24 md:pt-[120px]
        min-h-screen
      "
    >
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left max-w-2xl">
        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-[#0F1FCF] font-bold">
          404
        </h1>
        <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-thin mt-2">
          Page Not Found
        </h3>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl my-4 sm:my-6 leading-relaxed text-gray-700">
          We couldn't find the page you were looking for. It might have been moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 justify-center md:justify-start">
          <button
            onClick={handleReload}
            className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 border-2 border-gray-300 text-base sm:text-lg md:text-xl rounded-lg transition-all duration-500 ease hover:bg-black hover:text-white hover:border-black"
          >
            Reload Page
          </button>

          <button
            onClick={handleGoHome}
            className="px-5 py-2.5 sm:px-6 sm:py-3 md:px-8 md:py-4 text-base sm:text-lg md:text-xl bg-[#0F4EB3] text-white rounded-lg transition-all duration-500 ease hover:bg-white hover:text-[#0F4EB3] hover:border-2 hover:border-[#0F4EB3]"
          >
            Go to HomePage
          </button>
        </div>
      </div>

      {/* Right Image */}
      <div className="flex-shrink-0">
        <img
          src={KindimErrorImg}
          alt="Error"
          className="
            w-48 sm:w-56 md:w-72 lg:w-80 xl:w-96
            h-auto
            cursor-pointer transition-all duration-500 ease
            hover:scale-110 md:hover:scale-125 
            hover:brightness-110 
            hover:drop-shadow-[0_0_20px_rgba(26,115,232,0.6)]
          "
        />
      </div>
    </section>
  );
}

export default Section;