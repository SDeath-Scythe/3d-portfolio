// src/components/Loader.jsx
import { Html } from '@react-three/drei';

const Loader = () => {
  return (
    <Html>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(135deg, #001122, #002244)',
        color: '#00ffff',
        fontFamily: '"Courier New", monospace'
      }}>
        {/* Main loading animation */}
        <div style={{
          position: 'relative',
          marginBottom: '30px'
        }}>
          <div style={{
            width: '100px',
            height: '100px',
            border: '4px solid rgba(0, 255, 255, 0.2)',
            borderTop: '4px solid #00ffff',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite'
          }}></div>
          
          {/* Inner ring */}
          <div style={{
            position: 'absolute',
            top: '15px',
            left: '15px',
            width: '70px',
            height: '70px',
            border: '3px solid rgba(0, 255, 136, 0.3)',
            borderBottom: '3px solid #00ff88',
            borderRadius: '50%',
            animation: 'spinReverse 1.5s linear infinite'
          }}></div>
          
          {/* Core */}
          <div style={{
            position: 'absolute',
            top: '35px',
            left: '35px',
            width: '30px',
            height: '30px',
            background: 'radial-gradient(circle, #00ffff, #0099ff)',
            borderRadius: '50%',
            animation: 'pulse 2s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Loading text */}
        <div style={{
          fontSize: '24px',
          fontWeight: 'bold',
          marginBottom: '15px',
          textShadow: '0 0 10px rgba(0, 255, 255, 0.8)',
          animation: 'glow 2s ease-in-out infinite alternate'
        }}>
          INITIALIZING TACTICAL SYSTEMS
        </div>
        
        {/* Progress bar */}
        <div style={{
          width: '300px',
          height: '6px',
          background: 'rgba(0, 255, 255, 0.2)',
          borderRadius: '3px',
          overflow: 'hidden',
          marginBottom: '15px'
        }}>
          <div style={{
            width: '100%',
            height: '100%',
            background: 'linear-gradient(90deg, #00ffff, #00ff88)',
            borderRadius: '3px',
            animation: 'progressBar 3s ease-in-out infinite'
          }}></div>
        </div>
        
        {/* Status messages */}
        <div style={{
          fontSize: '12px',
          opacity: 0.8,
          animation: 'statusFade 4s ease-in-out infinite'
        }}>
          Loading 3D assets and initializing physics engine...
        </div>
      </div>
      
      {/* Enhanced CSS animations */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes spinReverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1);
            opacity: 1;
          }
          50% { 
            transform: scale(1.2);
            opacity: 0.8;
          }
        }
        
        @keyframes glow {
          0% { text-shadow: 0 0 10px rgba(0, 255, 255, 0.8); }
          100% { text-shadow: 0 0 20px rgba(0, 255, 255, 1), 0 0 30px rgba(0, 255, 255, 0.8); }
        }
        
        @keyframes progressBar {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        
        @keyframes statusFade {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </Html>
  );
};

export default Loader;