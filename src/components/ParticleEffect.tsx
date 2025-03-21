
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';

interface ParticleProps {
  count?: number;
  color?: string;
  size?: number;
  speed?: number;
  mouseEffect?: boolean;
}

const ParticleEffect: React.FC<ParticleProps> = ({ 
  count = 1000, 
  color = '#00F5FF', 
  size = 0.02, 
  speed = 0.05,
  mouseEffect = true
}) => {
  const mesh = useRef<THREE.Points>(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  
  // Create particles
  const particlesPosition = new Float32Array(count * 3);
  const particlesScale = new Float32Array(count);
  
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    particlesPosition[i3] = (Math.random() - 0.5) * 10;
    particlesPosition[i3 + 1] = (Math.random() - 0.5) * 10;
    particlesPosition[i3 + 2] = (Math.random() - 0.5) * 10;
    
    particlesScale[i] = Math.random();
  }
  
  useEffect(() => {
    if (!mouseEffect) return;
    
    const updateMousePosition = (e: MouseEvent) => {
      // Normalize mouse position to be between -1 and 1
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1
      };
    };
    
    window.addEventListener('mousemove', updateMousePosition);
    
    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, [mouseEffect]);
  
  useFrame((state, delta) => {
    if (!mesh.current) return;
    
    // Rotate particles slightly
    mesh.current.rotation.x += delta * 0.01;
    mesh.current.rotation.y += delta * 0.02;
    
    // Update particles position based on mouse movement if enabled
    if (mouseEffect) {
      const positions = mesh.current.geometry.attributes.position.array as Float32Array;
      
      for (let i = 0; i < count; i++) {
        const i3 = i * 3;
        
        // Move particles slightly towards mouse position
        positions[i3] += (mousePosition.current.x * 0.1 - positions[i3] * 0.01) * speed;
        positions[i3 + 1] += (mousePosition.current.y * 0.1 - positions[i3 + 1] * 0.01) * speed;
        
        // Reset particles that go too far
        if (Math.abs(positions[i3]) > 5) positions[i3] *= 0.95;
        if (Math.abs(positions[i3 + 1]) > 5) positions[i3 + 1] *= 0.95;
        if (Math.abs(positions[i3 + 2]) > 5) positions[i3 + 2] *= 0.95;
      }
      
      mesh.current.geometry.attributes.position.needsUpdate = true;
    }
  });
  
  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={particlesPosition}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-scale"
          count={count}
          array={particlesScale}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

export default ParticleEffect;
