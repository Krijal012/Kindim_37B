import React, { useState } from "react";
import wheelImg from "../../assets/icons/wheel.png";
import axios from "axios";
import { Header } from "../../Components/Header";
import { Footer } from "../../Components/Footer";

export default function RewardDashboard() {
  const [gems, setGems] = useState(1000);
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSpin = async () => {
  try {
    console.log("Spin clicked");
    setLoading(true);
    setResult("");

    const res = await axios.post(
      "http://localhost:5000/api/rewards/spin",
      { userId: "123" }
    );

    console.log("API response:", res.data);

    setGems(res.data.totalGems);
    setResult(`You won ${res.data.gemsWon} gems 🎉`);
  } catch (err) {
    console.error("Spin error:", err);
    setResult("API error. Check console.");
  } finally {
    setLoading(false);
  }
};


  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex justify-center px-5 pb-5 pt-24">
      
        <div className="w-full max-w-5xl border-[3px] border-blue-500 p-5">

          <h2 className="text-center text-xl font-bold mb-5">
            Your Reward Dashboard
          </h2>

          <div className="bg-gray-200 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-sm">Your Gem Balance</p>
              <p className="text-red-600 font-semibold">{gems} Gems</p>
              <p className="text-sm">
                Equivalent to Rs {(gems / 50).toFixed(2)}
              </p>
            </div>

            <button className="bg-blue-700 text-white px-6 py-2 rounded-full">
              Collect Gems
            </button>
          </div>

          <h3 className="text-center font-semibold mt-6 mb-2">
            Spin the Wheel Challenge
          </h3>

          <div className="flex justify-center my-6">
            <img src={wheelImg} alt="Spin Wheel" className="w-44 h-44" />
          </div>

          <div className="flex justify-center mt-2">
            <button
              onClick={handleSpin}
              disabled={loading}
              className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800 disabled:opacity-50"
            >
              {loading ? "Spinning..." : "Spin Now"}
            </button>
          </div>

          {result && (
            <p className="text-center font-semibold mt-4">
              {result}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
