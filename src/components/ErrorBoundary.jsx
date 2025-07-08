// src/components/ErrorBoundary.jsx
import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Log error details
    console.error('3D Scene Error:', error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#ff4444',
          textAlign: 'center',
          fontSize: '18px',
          fontFamily: '"Courier New", monospace',
          background: 'rgba(0, 0, 0, 0.9)',
          padding: '30px',
          borderRadius: '10px',
          border: '2px solid #ff4444',
          maxWidth: '500px',
          zIndex: 10000
        }}>
          <h2 style={{ color: '#ff4444', marginBottom: '20px' }}>
            ⚠️ 3D Scene Error
          </h2>
          <p style={{ marginBottom: '15px' }}>
            Something went wrong loading the 3D scene.
          </p>
          <details style={{ marginBottom: '20px', textAlign: 'left', fontSize: '12px' }}>
            <summary style={{ cursor: 'pointer', color: '#00ff88', marginBottom: '10px' }}>
              Show Error Details
            </summary>
            <div style={{ 
              background: '#1a1a1a', 
              padding: '10px', 
              borderRadius: '5px', 
              border: '1px solid #333',
              maxHeight: '200px',
              overflow: 'auto'
            }}>
              <strong>Error:</strong> {this.state.error && this.state.error.toString()}
              <br />
              <strong>Stack:</strong>
              <pre style={{ fontSize: '10px', margin: '5px 0' }}>
                {this.state.errorInfo.componentStack}
              </pre>
            </div>
          </details>
          <button 
            onClick={() => window.location.reload()}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: '#00ff88',
              color: '#000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              fontFamily: '"Courier New", monospace',
              fontWeight: 'bold',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#00cc66';
              e.target.style.boxShadow = '0 0 15px rgba(0, 255, 136, 0.5)';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '#00ff88';
              e.target.style.boxShadow = 'none';
            }}
          >
            🔄 Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
