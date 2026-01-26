import KindimErrorImg from '../assets/Errorpage.png';

function Section() {
  return (
    <section
      className="
        flex flex-col md:flex-row justify-between items-center
        px-6 sm:px-10 md:px-20
        py-28 sm:py-32 md:py-40 
        gap-10 pt-[120px]
      "
    >
      {/* Left Content */}
      <div className="flex-1 text-center md:text-left">
        <h1 className="text-6xl sm:text-7xl md:text-8xl text-[#0F1FCF]">404</h1>
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-thin mt-2">Page Not Found</h3>

        <p className="text-lg sm:text-xl md:text-2xl my-4 leading-relaxed">
          We couldn't find the page you were <br />
          looking for. It might have been <br />
          moved or deleted.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mt-6 justify-center md:justify-start">
          <button className="px-6 py-3 sm:px-8 sm:py-4 border-0 text-lg sm:text-xl rounded transition-all duration-500 ease hover:bg-black hover:text-white">
            Reload Page
          </button>

          <button className="px-6 py-3 sm:px-8 sm:py-4 border-0 text-lg sm:text-xl bg-[#0F4EB3] text-white rounded transition-all duration-500 ease hover:bg-white hover:text-[#0F4EB3]">
            Go to HomePage
          </button>
        </div>
      </div>

      {/* Right Image */}
      <img
        src={KindimErrorImg}
        alt="Error"
        className="
          max-w-[220px] sm:max-w-[280px] md:max-w-[350px] 
          cursor-pointer transition-all duration-500 ease
          hover:scale-125 hover:brightness-110 hover:hue-rotate-90
          hover:shadow-[0_0_20px_rgba(255,255,255,0.8),0_0_40px_rgba(26,115,232,0.6)]
          hover:border-2 hover:border-white
        "
      />
    </section>
  );
}

export default Section;
