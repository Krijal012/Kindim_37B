import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import Sidebar from "../../components/Sidebar";
import PersonalInfo from "../../components/PersonalInfo";

export default function ProfilePage({ onLogout }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/profile");
        setUser(res.data);
      } catch (err) {
        console.error("Profile fetch error:", err);
      }
    };
    fetchProfile();
  }, []);

  if (!user) return <p>Loading...</p>;

  return (
    <>
      <Header onLogout={onLogout} />

      <main className="min-h-screen bg-gray-100 pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-6">
            {/* Left Sidebar */}
            <Sidebar user={user} />

            {/* Right Content - Now passing user and setUser */}
            <PersonalInfo user={user} setUser={setUser} />
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}