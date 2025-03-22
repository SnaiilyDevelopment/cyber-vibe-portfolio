
import React, { useRef } from 'react';
import { useThree, useFrame } from '@react-three/fiber';
import { Text3D, Float } from '@react-three/drei';
import * as THREE from 'three';

const FloatingText: React.FC = () => {
  const { viewport } = useThree();
  const textRef = useRef<THREE.Mesh>();
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.2;
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text3D
        ref={textRef}
        font="/fonts/inter_bold.json"
        size={viewport.width / 20}
        height={0.1}
        curveSegments={12}
        bevelEnabled
        bevelThickness={0.02}
        bevelSize={0.02}
        bevelSegments={5}
        position={[0, 0, 0]}
      >
        CODE
        <meshStandardMaterial color="#00F5FF" emissive="#00F5FF" emissiveIntensity={0.5} />
      </Text3D>
    </Float>
  );
};

export default FloatingText;
