// src/components/Loader.jsx
import { Html } from '@react-three/drei'; // Html is used to render HTML/CSS elements within the 3D scene

const Loader = () => {
  return (
    <Html> {/* Html component lets us put regular HTML/CSS inside the R3F canvas */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh', /* Make the loader container fill the viewport */
      }}>
        <div style={{
          width: '80px',
          height: '80px',
          border: '4px solid rgba(255, 255, 255, 0.2)', /* Transparent white border */
          borderTop: '4px solid #fff', /* Solid white top border for spin effect */
          borderRadius: '50%',
          animation: 'spin 1s linear infinite' /* Apply the spinning animation */
        }}></div>
      </div>
      {/* Define the CSS animation keyframe for 'spin' */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </Html>
  );
};

export default Loader;