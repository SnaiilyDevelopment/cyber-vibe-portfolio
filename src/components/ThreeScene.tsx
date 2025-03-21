
import React, { useRef, Suspense } from 'react';
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

// Main particle effect scene
const ParticleScene = () => {
  return (
    <>
      {/* Blue particles with mouse interaction */}
      <ParticleEffect 
        count={1000} 
        color="#4361EE" 
        size={0.03} 
        speed={0.03} 
      />
      
      {/* Cyan particles with mouse interaction */}
      <ParticleEffect 
        count={500} 
        color="#00F5FF" 
        size={0.025} 
        speed={0.02} 
      />
      
      {/* Purple particles with slow movement */}
      <ParticleEffect 
        count={300} 
        color="#7B5EA7" 
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
          <Environment preset="night" />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default ThreeScene;
