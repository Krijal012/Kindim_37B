import ErrorMiddle from "../../Components/ErrorMiddle";
import { Footer } from "../../Components/Footer";
import { Header } from "../../Components/Header";

export function ErrorPage() {
  return (
    <>
      <Header />
      {/* Padding top to account for fixed header height */}
      <div className="pt-20 sm:pt-24 md:pt-32">
        <ErrorMiddle />
      </div>
      <Footer />
    </>
  );
}