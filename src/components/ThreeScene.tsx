
import React, { useRef, Suspense, useEffect, useState } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Environment } from '@react-three/drei';
import ParticleEffect from './ParticleEffect';
import * as THREE from 'three';

interface SceneProps {
  children?: React.ReactNode;
}

// Camera controller with subtle movement
const CameraController = () => {
  const { camera, mouse } = useThree();
  const initialPosition = useRef(new THREE.Vector3(0, 0, 5));
  
  useFrame(() => {
    // Subtle camera movement based on mouse position
    camera.position.x = initialPosition.current.x + mouse.x * 0.5;
    camera.position.y = initialPosition.current.y + mouse.y * 0.5;
    camera.lookAt(0, 0, 0);
  });
  
  return null;
};

// Dynamic color based on time of day
const useTimeBasedColors = () => {
  const [colors, setColors] = useState({
    primary: "#4361EE",
    secondary: "#00F5FF",
    accent: "#7B5EA7"
  });

  useEffect(() => {
    // Update colors based on time
    const updateColors = () => {
      const hours = new Date().getHours();
      
      // Morning (6am-12pm): Brighter blues
      if (hours >= 6 && hours < 12) {
        setColors({
          primary: "#4361EE", // Blue
          secondary: "#00F5FF", // Cyan
          accent: "#7B5EA7" // Purple
        });
      } 
      // Afternoon (12pm-6pm): Warmer tones
      else if (hours >= 12 && hours < 18) {
        setColors({
          primary: "#5E60CE", // Warm blue
          secondary: "#64DFDF", // Teal
          accent: "#9B5DE5" // Light purple
        });
      } 
      // Evening (6pm-12am): Deep purples
      else if (hours >= 18 && hours < 24) {
        setColors({
          primary: "#3A0CA3", // Deep purple
          secondary: "#4895EF", // Electric blue
          accent: "#FF6B6B" // Warm accent
        });
      } 
      // Night (12am-6am): Dark blues
      else {
        setColors({
          primary: "#240046", // Dark purple
          secondary: "#3F37C9", // Dark blue
          accent: "#4CC9F0" // Bright accent
        });
      }
    };

    // Initial update
    updateColors();
    
    // Update colors every hour
    const interval = setInterval(updateColors, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return colors;
};

// Main particle effect scene
const ParticleScene = () => {
  const colors = useTimeBasedColors();
  
  return (
    <>
      {/* Primary particles with mouse interaction */}
      <ParticleEffect 
        count={1000} 
        color={colors.primary} 
        size={0.03} 
        speed={0.03} 
      />
      
      {/* Secondary particles with mouse interaction */}
      <ParticleEffect 
        count={500} 
        color={colors.secondary} 
        size={0.025} 
        speed={0.02} 
      />
      
      {/* Accent particles with slow movement */}
      <ParticleEffect 
        count={300} 
        color={colors.accent} 
        size={0.04} 
        speed={0.01} 
      />
    </>
  );
};

// Main Three.js scene component
const ThreeScene: React.FC<SceneProps> = ({ children }) => {
  return (
    <div className="canvas-container">
      <Canvas dpr={[1, 2]} camera={{ position: [0, 0, 5], fov: 45 }}>
        <Suspense fallback={null}>
          <CameraController />
          
          {/* Enable orbit controls with limited rotation */}
          <OrbitControls 
            enableZoom={false} 
            enablePan={false}
            rotateSpeed={0.5}
            minPolarAngle={Math.PI / 2 - 0.5} 
            maxPolarAngle={Math.PI / 2 + 0.5}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
          />
          
          {/* Main scene content */}
          <ParticleScene />
          
          {/* Add any additional 3D children */}
          {children}
          
          {/* Environment lighting */}
          <ambientLight intensity={0.2} />
          <pointLight position={[10, 10, 10]} intensity={0.5} />
          
          {/* Replace Environment preset with manual lighting setup */}
          <hemisphereLight intensity={0.5} color="#8866ff" groundColor="#000033" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
