// src/components/UI/SoundVisualizer.jsx
import React, { useRef, useEffect, useState } from 'react';
import './SoundVisualizer.css';

const SoundVisualizer = ({ isActive = false, volume = 0.5 }) => {
  const canvasRef = useRef(null);
  const [bars, setBars] = useState([]);
  const animationRef = useRef();
  
  useEffect(() => {
    // Initialize frequency bars
    const barCount = 32;
    const initialBars = Array.from({ length: barCount }, (_, i) => ({
      id: i,
      height: Math.random() * 0.5 + 0.1,
      targetHeight: Math.random() * 0.5 + 0.1,
      frequency: Math.random() * 0.02 + 0.01,
      phase: Math.random() * Math.PI * 2
    }));
    setBars(initialBars);
  }, []);
  
  useEffect(() => {
    if (!isActive) return;
    
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Update and draw bars
      setBars(prevBars => {
        const newBars = prevBars.map(bar => {
          // Simulate audio frequency data
          const time = Date.now() * 0.001;
          const newHeight = (Math.sin(time * bar.frequency + bar.phase) + 1) * 0.5 * volume;
          
          return {
            ...bar,
            height: newHeight,
            targetHeight: newHeight
          };
        });
        
        // Draw bars
        const barWidth = width / newBars.length;
        newBars.forEach((bar, index) => {
          const barHeight = bar.height * height * 0.8;
          const x = index * barWidth;
          const y = height - barHeight;
          
          // Create gradient
          const gradient = ctx.createLinearGradient(0, y, 0, height);
          gradient.addColorStop(0, `rgba(0, 255, 255, 0.8)`);
          gradient.addColorStop(0.5, `rgba(0, 255, 136, 0.6)`);
          gradient.addColorStop(1, `rgba(0, 136, 255, 0.4)`);
          
          ctx.fillStyle = gradient;
          ctx.fillRect(x, y, barWidth - 1, barHeight);
          
          // Add glow effect
          ctx.shadowBlur = 10;
          ctx.shadowColor = '#00ffff';
          ctx.fillRect(x, y, barWidth - 1, barHeight);
          ctx.shadowBlur = 0;
        });
        
        return newBars;
      });
      
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, volume]);
  
  if (!isActive) return null;
  
  return (
    <div className="sound-visualizer">
      <canvas
        ref={canvasRef}
        width={200}
        height={60}
        className="visualizer-canvas"
      />
      <div className="visualizer-label">AUDIO SPECTRUM</div>
    </div>
  );
};

export default SoundVisualizer;
