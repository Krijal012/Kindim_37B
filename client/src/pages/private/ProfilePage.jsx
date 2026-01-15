import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import PersonalInfo from "../../components/PersonalInfo";

export default function ProfilePage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-gray-100 pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            {/* Left Sidebar */}
            <Sidebar />
            
            {/* Right Content */}
            <PersonalInfo />
          </div>
        </div>
      </main>
      
      <Footer />
    </>
  );
}