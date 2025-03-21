
import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

interface Skill {
  id: string;
  name: string;
  category: string;
  proficiency: number;
}

interface SkillsGalaxyProps {
  skills: Skill[];
}

const SkillsGalaxy: React.FC<SkillsGalaxyProps> = ({ skills }) => {
  const groupRef = useRef<THREE.Group>(null);
  
  // Generate positions in a spherical formation
  const skillPositions = useMemo(() => {
    return skills.map((skill, i) => {
      // Create a spherical distribution
      const phi = Math.acos(-1 + (2 * i) / Math.max(skills.length - 1, 1));
      const theta = Math.sqrt(skills.length * Math.PI) * phi;
      
      // Adjust radius based on proficiency (higher proficiency = closer to center)
      const radiusFactor = 1 - skill.proficiency / 110; // Slightly reduce to avoid direct center
      const radius = 3 + (radiusFactor * 2);
      
      // Convert to Cartesian coordinates
      return {
        x: radius * Math.cos(theta) * Math.sin(phi),
        y: radius * Math.sin(theta) * Math.sin(phi),
        z: radius * Math.cos(phi),
        color: getColorByCategory(skill.category)
      };
    });
  }, [skills]);
  
  // Get color based on skill category
  function getColorByCategory(category: string): string {
    switch (category.toLowerCase()) {
      case 'programming':
        return '#4361EE'; // Blue
      case 'frontend':
        return '#00F5FF'; // Cyan
      case 'backend':
        return '#7B5EA7'; // Purple
      case '3d':
        return '#FF3864'; // Pink
      case 'animation':
        return '#FFD166'; // Yellow
      default:
        return '#FFFFFF'; // White
    }
  }
  
  // Rotate the entire galaxy
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.001;
      groupRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.2) * 0.1;
    }
  });
  
  return (
    <group ref={groupRef}>
      {/* Connection lines between related skills */}
      {skills.map((skill, i) => (
        skills
          .filter((_, j) => 
            // Connect only skills in same category
            j > i && 
            skills[j].category === skill.category
          )
          .map((otherSkill, j) => (
            <line key={`${skill.id}-${otherSkill.id}-${j}`}>
              <bufferGeometry attach="geometry">
                <float32BufferAttribute 
                  attach="attributes-position" 
                  args={[
                    new Float32Array([
                      skillPositions[i].x, skillPositions[i].y, skillPositions[i].z,
                      skillPositions[skills.findIndex(s => s.id === otherSkill.id)].x, 
                      skillPositions[skills.findIndex(s => s.id === otherSkill.id)].y, 
                      skillPositions[skills.findIndex(s => s.id === otherSkill.id)].z
                    ]), 
                    3
                  ]} 
                />
              </bufferGeometry>
              <lineBasicMaterial 
                attach="material" 
                color={skillPositions[i].color} 
                transparent 
                opacity={0.2} 
                linewidth={1}
              />
            </line>
          ))
      ))}
      
      {/* Skills as floating spheres with text */}
      {skills.map((skill, i) => (
        <Float 
          key={skill.id}
          position={[skillPositions[i].x, skillPositions[i].y, skillPositions[i].z]}
          rotation={[0, 0, 0]}
          rotationIntensity={0.5}
          floatIntensity={1}
          speed={2}
        >
          <mesh>
            <sphereGeometry args={[skill.proficiency / 120, 16, 16]} />
            <meshStandardMaterial 
              color={skillPositions[i].color} 
              emissive={skillPositions[i].color} 
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
          </mesh>
          <Text
            position={[0, 0, 0]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            maxWidth={1}
            overflowWrap="break-word"
          >
            {skill.name}
          </Text>
        </Float>
      ))}
    </group>
  );
};

export default SkillsGalaxy;
