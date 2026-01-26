import React from 'react';
import { useNavigate } from "react-router-dom";
import logoIcon from '../../assets/icons/logo-icon.png';

export default function WelcomePage() {
     const navigate = useNavigate();
  return (
    <div className="relative min-h-screen bg-white overflow-hidden flex items-center justify-center">
      {/* Moving animated background */}
      <div className="absolute inset-0">
        {/* Moving gradient layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-400 to-white opacity-70 animate-gradient"></div>
        
        {/* Moving circles */}
        <div className="absolute w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-40 animate-move-1"></div>
        <div className="absolute w-[500px] h-[500px] bg-white rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-move-2"></div>
        <div className="absolute w-80 h-80 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-35 animate-move-3"></div>
        <div className="absolute w-72 h-72 bg-blue-600 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-move-4"></div>
        <div className="absolute w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-25 animate-move-5"></div>
        
        {/* Moving wave effect */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute w-full h-32 bg-gradient-to-r from-transparent via-blue-600 to-transparent animate-wave-1" style={{top: '20%'}}></div>
          <div className="absolute w-full h-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-wave-2" style={{top: '50%'}}></div>
          <div className="absolute w-full h-28 bg-gradient-to-r from-transparent via-blue-500 to-transparent animate-wave-3" style={{top: '70%'}}></div>
        </div>
        
        {/* Moving particles */}
        <div className="absolute inset-0">
          <div className="absolute w-2 h-2 bg-blue-700 rounded-full animate-particle-1"></div>
          <div className="absolute w-3 h-3 bg-blue-600 rounded-full animate-particle-2"></div>
          <div className="absolute w-2 h-2 bg-blue-500 rounded-full animate-particle-3"></div>
          <div className="absolute w-3 h-3 bg-blue-700 rounded-full animate-particle-4"></div>
          <div className="absolute w-2 h-2 bg-blue-400 rounded-full animate-particle-5"></div>
          <div className="absolute w-3 h-3 bg-blue-600 rounded-full animate-particle-6"></div>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-6">
        {/* Logo with animation */}
        <div className="mb-8 flex justify-center">
          <div className="w-36 h-36 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-scale-bounce hover:scale-110 transition-transform duration-300">
           <div>
            <img src={logoIcon} alt="Logo" className="w-20 h-20" />
              
            </div>
          </div>
        </div>

        {/* Welcome text */}
        <h1 className="text-7xl font-bold text-blue-700 mb-4 animate-slide-up drop-shadow-lg">
          Welcome
        </h1>
        <p className="text-2xl text-blue-600 mb-12 animate-slide-up-delay drop-shadow-md">
          Shop smart, shop easy with K-Store
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center animate-fade-in">
          <button className="group relative px-10 py-5 bg-blue-600 text-white font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 w-56 overflow-hidden"
          onClick={() => navigate("/login")}
          >
            <span className="relative z-10">Login</span>
            <div className="absolute inset-0 bg-blue-700 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
          
          <button className="group relative px-10 py-5 bg-white text-blue-600 font-bold text-lg rounded-full shadow-xl hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 w-56 border-4 border-blue-600 overflow-hidden">
            <span className="relative z-10">Sign Up</span>
            <div className="absolute inset-0 bg-blue-50 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></div>
          </button>
        </div>
      </div>

      <style jsx>{`
        @keyframes move1 {
          0%, 100% { transform: translate(0, 0); }
          25% { transform: translate(100px, -80px); }
          50% { transform: translate(200px, 60px); }
          75% { transform: translate(50px, 120px); }
        }

        @keyframes move2 {
          0%, 100% { transform: translate(100%, 0); }
          25% { transform: translate(80%, 100px); }
          50% { transform: translate(60%, -50px); }
          75% { transform: translate(90%, 80px); }
        }

        @keyframes move3 {
          0%, 100% { transform: translate(0, 100%); }
          33% { transform: translate(-120px, 70%); }
          66% { transform: translate(80px, 80%); }
        }

        @keyframes move4 {
          0%, 100% { transform: translate(100%, 100%); }
          50% { transform: translate(70%, 60%); }
        }

        @keyframes move5 {
          0%, 100% { transform: translate(50%, 50%); }
          33% { transform: translate(40%, 70%); }
          66% { transform: translate(70%, 30%); }
        }

        @keyframes wave1 {
          0% { transform: translateX(-100%) rotate(-2deg); }
          100% { transform: translateX(100%) rotate(2deg); }
        }

        @keyframes wave2 {
          0% { transform: translateX(100%) rotate(1deg); }
          100% { transform: translateX(-100%) rotate(-1deg); }
        }

        @keyframes wave3 {
          0% { transform: translateX(-100%) rotate(-1deg); }
          100% { transform: translateX(100%) rotate(1deg); }
        }

        @keyframes particle1 {
          0% { transform: translate(10%, 110%) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(90%, -10%) scale(1); opacity: 0; }
        }

        @keyframes particle2 {
          0% { transform: translate(90%, 110%) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(20%, -10%) scale(1); opacity: 0; }
        }

        @keyframes particle3 {
          0% { transform: translate(50%, 110%) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(70%, -10%) scale(1); opacity: 0; }
        }

        @keyframes particle4 {
          0% { transform: translate(30%, 110%) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(80%, -10%) scale(1); opacity: 0; }
        }

        @keyframes particle5 {
          0% { transform: translate(70%, 110%) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(30%, -10%) scale(1); opacity: 0; }
        }

        @keyframes particle6 {
          0% { transform: translate(20%, 110%) scale(0); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translate(85%, -10%) scale(1); opacity: 0; }
        }

        @keyframes gradient {
          0%, 100% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(5deg) scale(1.1); }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes scaleBounce {
          0% { opacity: 0; transform: scale(0); }
          50% { transform: scale(1.1); }
          100% { opacity: 1; transform: scale(1); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .animate-move-1 { animation: move1 20s ease-in-out infinite; }
        .animate-move-2 { animation: move2 25s ease-in-out infinite; }
        .animate-move-3 { animation: move3 18s ease-in-out infinite; }
        .animate-move-4 { animation: move4 22s ease-in-out infinite; }
        .animate-move-5 { animation: move5 24s ease-in-out infinite; }
        
        .animate-wave-1 { animation: wave1 15s linear infinite; }
        .animate-wave-2 { animation: wave2 12s linear infinite; }
        .animate-wave-3 { animation: wave3 18s linear infinite; }
        
        .animate-particle-1 { animation: particle1 8s ease-in-out infinite; }
        .animate-particle-2 { animation: particle2 10s ease-in-out infinite 2s; }
        .animate-particle-3 { animation: particle3 9s ease-in-out infinite 1s; }
        .animate-particle-4 { animation: particle4 11s ease-in-out infinite 3s; }
        .animate-particle-5 { animation: particle5 7s ease-in-out infinite 1.5s; }
        .animate-particle-6 { animation: particle6 9.5s ease-in-out infinite 2.5s; }
        
        .animate-gradient { animation: gradient 20s ease-in-out infinite; }
        .animate-slide-up { animation: slideUp 0.8s ease-out; }
        .animate-slide-up-delay { animation: slideUp 0.8s ease-out 0.2s both; }
        .animate-scale-bounce { animation: scaleBounce 0.8s ease-out; }
        .animate-fade-in { animation: fadeIn 1s ease-out 0.4s both; }
      `}</style>
    </div>
  );
}