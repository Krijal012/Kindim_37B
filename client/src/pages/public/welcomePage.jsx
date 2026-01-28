import React from "react";
import { useNavigate } from "react-router-dom";
import logoIcon from "../../assets/icons/logo-icon.png";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen bg-white overflow-hidden flex items-center justify-center">
      
      {/* Animated Background */}
      <div className="absolute inset-0">
        {/* Pulsing gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 via-blue-400 to-white opacity-70 animate-bg-pulse"></div>

        {/* Floating glass blobs */}
        <div className="absolute w-[420px] h-[420px] bg-blue-500/40 backdrop-blur-3xl rounded-full animate-float-1"></div>
        <div className="absolute w-[520px] h-[520px] bg-white/40 backdrop-blur-3xl rounded-full animate-float-2"></div>
        <div className="absolute w-[360px] h-[360px] bg-blue-400/40 backdrop-blur-3xl rounded-full animate-float-3"></div>

        {/* Shimmer waves */}
        <div className="absolute inset-0 opacity-25">
          <div className="absolute w-full h-32 bg-gradient-to-r from-transparent via-blue-600 to-transparent animate-shimmer top-[30%]"></div>
          <div className="absolute w-full h-24 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-shimmer-delay top-[60%]"></div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-6">
        
        {/* Logo */}
        <div className="mb-10 flex justify-center">
          <div className="w-36 h-36 bg-blue-600 rounded-full flex items-center justify-center shadow-2xl animate-logo-float">
            <img src={logoIcon} alt="Logo" className="w-24 h-24" />
          </div>
        </div>

        {/* Text */}
        <h1 className="text-7xl font-bold text-blue-700 mb-4 animate-text-reveal">
          Welcome
        </h1>
        <p className="text-2xl text-blue-600 mb-14 animate-text-reveal-delay">
          Shop smart, shop easy with Kindim
        </p>

        {/* Buttons */}
    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
  {/* Neon Login Button */}
  <button
    onClick={() => navigate("/login")}
    className="neon-btn neon-btn-primary w-56 relative overflow-hidden font-bold text-lg rounded-full px-10 py-5 transition-transform duration-300 hover:scale-105"
  >
    Login
    <span className="neon-btn-glow"></span>
    <span className="neon-btn-shine"></span>
  </button>

  {/* Neon Sign Up Button */}
  <button
    onClick={() => navigate("/signup")}
    className="neon-btn neon-btn-secondary w-56 relative overflow-hidden font-bold text-lg rounded-full px-10 py-5 transition-transform duration-300 hover:scale-105"
  >
    Sign Up
    <span className="neon-btn-glow"></span>
    <span className="neon-btn-shine"></span>
  </button>

  <style>{`
    /* Base neon button */
    .neon-btn {
      position: relative;
      z-index: 0;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      cursor: pointer;
      box-shadow: 0 0 15px rgba(59,130,246,0.5);
    }

    /* Inner neon glow */
    .neon-btn-glow {
      position: absolute;
      inset: 0;
      border-radius: inherit;
      box-shadow: 0 0 10px rgba(59,130,246,0.8),
                  0 0 20px rgba(59,130,246,0.6),
                  0 0 40px rgba(59,130,246,0.4);
      opacity: 0.6;
      z-index: -1;
      transition: opacity 0.3s;
    }

    .neon-btn:hover .neon-btn-glow {
      opacity: 1;
      box-shadow: 0 0 30px rgba(59,130,246,1),
                  0 0 60px rgba(59,130,246,0.8),
                  0 0 90px rgba(59,130,246,0.6);
    }

    /* Shine effect */
    .neon-btn-shine {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(120deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 50%, rgba(255,255,255,0.2) 100%);
      transform: rotate(45deg) translateX(-100%);
      transition: transform 0.5s ease;
    }

    .neon-btn:hover .neon-btn-shine {
      transform: rotate(45deg) translateX(100%);
    }

    /* Primary button colors */
    .neon-btn-primary {
      background: linear-gradient(90deg, #3b82f6, #60a5fa);
      color: #fff;
    }

    /* Secondary button colors */
    .neon-btn-secondary {
      background: rgba(255,255,255,0.05);
      color: #3b82f6;
      border: 2px solid #3b82f6;
    }
  `}</style>
</div>
      </div>

      {/* Animations */}
      <style>{`
        /* Background */
        @keyframes bgPulse {
          0%,100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        /* Floating blobs */
        @keyframes float1 {
          0%,100% { transform: translate(-10%, -10%) rotate(0deg); }
          50% { transform: translate(10%, 15%) rotate(20deg); }
        }
        @keyframes float2 {
          0%,100% { transform: translate(60%, 10%) rotate(0deg); }
          50% { transform: translate(40%, 30%) rotate(-20deg); }
        }
        @keyframes float3 {
          0%,100% { transform: translate(20%, 60%) rotate(0deg); }
          50% { transform: translate(30%, 40%) rotate(15deg); }
        }

        /* Shimmer */
        @keyframes shimmer {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }

        /* Logo */
        @keyframes logoFloat {
          0%,100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        /* Text */
        @keyframes textReveal {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Button glow */
        @keyframes glow {
          0%,100% { box-shadow: 0 0 20px rgba(37,99,235,0.4); }
          50% { box-shadow: 0 0 40px rgba(37,99,235,0.7); }
        }

        /* Classes */
        .animate-bg-pulse { animation: bgPulse 18s ease-in-out infinite; }
        .animate-float-1 { animation: float1 22s ease-in-out infinite; }
        .animate-float-2 { animation: float2 26s ease-in-out infinite; }
        .animate-float-3 { animation: float3 20s ease-in-out infinite; }

        .animate-shimmer { animation: shimmer 14s linear infinite; }
        .animate-shimmer-delay { animation: shimmer 18s linear infinite reverse; }

        .animate-logo-float { animation: logoFloat 4s ease-in-out infinite; }

        .animate-text-reveal { animation: textReveal 1s ease-out; }
        .animate-text-reveal-delay { animation: textReveal 1s ease-out 0.3s both; }

        .animate-glow { animation: glow 3s ease-in-out infinite; }
        .animate-glow-light { animation: glow 3s ease-in-out infinite alternate; }
      `}</style>
    </div>
  );
} 
