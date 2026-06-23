import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

interface NodeData {
  name: string;
  position: [number, number, number];
}

const nodes: NodeData[] = [
  { name: 'AI Integration', position: [1.3, 0.8, 0.5] },
  { name: 'Robotics Control', position: [-1.3, 0.9, -0.5] },
  { name: 'Embedded Systems', position: [0, -1.2, 0.6] },
  { name: 'IoT Sensing', position: [0.8, -0.7, -1.1] },
  { name: 'Python Core', position: [-0.9, -0.6, 1.0] },
  { name: 'ESP32 Nodes', position: [1.6, -0.2, 0.8] },
  { name: 'Arduino Platform', position: [-1.6, -0.2, -0.8] },
  { name: 'Networking Buses', position: [0, 1.4, -0.3] }
];

const NetworkScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const { mouse } = useThree();

  // Draw lines connecting the nodes
  const linePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    // Connect each node to its nearest neighbors to create a web
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = new THREE.Vector3(...nodes[i].position).distanceTo(new THREE.Vector3(...nodes[j].position));
        // Connect if they are within a reasonable distance
        if (dist < 2.5) {
          points.push(new THREE.Vector3(...nodes[i].position));
          points.push(new THREE.Vector3(...nodes[j].position));
        }
      }
    }
    return points;
  }, []);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Slow rotation
      groupRef.current.rotation.y += delta * 0.05;
      
      // Gentle mouse parallax effect
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, mouse.y * 0.2, 0.05);
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, mouse.x * 0.1, 0.05);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Node Spheres */}
      {nodes.map((node, i) => (
        <mesh key={i} position={node.position}>
          <sphereGeometry args={[0.05, 16, 16]} />
          <meshBasicMaterial color="#A61E2D" />
          <Html distanceFactor={4} center>
            <div className="px-3 py-1 border border-white/5 bg-[#0A0A0A]/90 text-[8px] uppercase tracking-[0.2em] text-luxury-text whitespace-nowrap select-none font-mono pointer-events-none shadow-gold-glow">
              {node.name}
            </div>
          </Html>
        </mesh>
      ))}

      {/* Network connection lines */}
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color="rgba(166, 30, 45, 0.20)" linewidth={1} />
      </lineSegments>
    </group>
  );
};

export const TechNetwork: React.FC = () => {
  return (
    <section 
      id="tech-network" 
      className="relative w-full h-[600px] bg-transparent flex flex-col justify-center items-center overflow-hidden border-t border-white/[0.02]"
    >
      {/* Background Title Card */}
      <div className="absolute top-12 text-center z-10">
        <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-semibold">
          07 / System Connections
        </span>
        <h2 className="text-2xl md:text-3xl font-light uppercase tracking-widest text-luxury-text mt-3">
          Interactive <span className="font-semibold text-transparent text-outline">Technology Network</span>
        </h2>
      </div>

      {/* Interactive 3D Canvas */}
      <div 
        className="w-full h-full relative cursor-grab active:cursor-grabbing"
        data-cursor="drag"
      >
        <Canvas camera={{ position: [0, 0, 3.2] }}>
          <ambientLight intensity={0.5} />
          <NetworkScene />
        </Canvas>
      </div>

      <div className="absolute bottom-8 text-[9px] uppercase tracking-[0.25em] text-luxury-lightGray/70 select-none">
        Move mouse to shift network perspective
      </div>
    </section>
  );
};
