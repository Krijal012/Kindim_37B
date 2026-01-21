import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import PersonalInfo from "../../components/PersonalInfo";

export default function Profile() {
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
    <div className="flex min-h-screen gap-6 p-6 bg-gray-100">
      <Sidebar user={user} />
      <PersonalInfo user={user} setUser={setUser} />
    </div>
  );
}
