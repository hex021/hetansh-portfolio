import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html } from '@react-three/drei';
import * as THREE from 'three';

interface NodeData {
  id: string;
  name: string;
  position: [number, number, number];
}

const nodes: NodeData[] = [
  { id: 'cv', name: 'Computer Vision', position: [1.35, 0.45, 0.4] },
  { id: 'ros2', name: 'ROS 2 Robotics', position: [-1.35, 0.5, -0.4] },
  { id: 'embedded', name: 'Embedded Systems', position: [0.1, -0.65, 0.7] },
  { id: 'sensors', name: 'Sensor Telemetry', position: [0.95, -0.4, -0.85] },
  { id: 'python', name: 'Python & AI/ML', position: [-0.95, -0.35, 0.75] },
  { id: 'esp32', name: 'ESP32 Nodes', position: [1.45, -0.15, 0.55] },
  { id: 'signal', name: 'Signal Conditioning', position: [-1.45, -0.15, -0.65] },
  { id: 'backend', name: 'FastAPI Backend', position: [0.0, 0.75, -0.3] }
];

interface NodeSphereProps {
  node: NodeData;
  isHovered: boolean;
  onHover: (id: string | null) => void;
}

const NodeSphere: React.FC<NodeSphereProps> = ({ node, isHovered, onHover }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  return (
    <mesh
      ref={meshRef}
      position={node.position}
      scale={isHovered ? 1.4 : 1.0}
      onPointerOver={(e) => {
        e.stopPropagation();
        onHover(node.id);
      }}
      onPointerOut={() => onHover(null)}
    >
      <sphereGeometry args={[0.065, 24, 24]} />
      <meshStandardMaterial
        color={isHovered ? '#D4AF37' : '#A61E2D'}
        emissive={isHovered ? '#D4AF37' : '#A61E2D'}
        emissiveIntensity={isHovered ? 0.9 : 0.4}
        roughness={0.2}
      />
      <Html distanceFactor={4.8} center>
        <div
          className={`px-3 py-1.5 border text-[11px] uppercase tracking-wider whitespace-nowrap select-none font-mono transition-all duration-300 pointer-events-none rounded-sm shadow-lg ${
            isHovered
              ? 'bg-[#1A1A1A] border-luxury-gold text-luxury-gold scale-110 shadow-gold-glow'
              : 'bg-[#0E0E0E]/95 border-white/10 text-[#EDEDED]'
          }`}
        >
          {node.name}
        </div>
      </Html>
    </mesh>
  );
};

const NetworkScene: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Draw lines connecting the nodes
  const linePoints = useMemo(() => {
    const points: THREE.Vector3[] = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const p1 = new THREE.Vector3(...nodes[i].position);
        const p2 = new THREE.Vector3(...nodes[j].position);
        const dist = p1.distanceTo(p2);
        if (dist < 2.4) {
          points.push(p1);
          points.push(p2);
        }
      }
    }
    return points;
  }, []);

  const lineGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(linePoints);
  }, [linePoints]);

  useFrame((_, delta) => {
    if (groupRef.current && !hoveredNode) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} intensity={1.2} />
      <group ref={groupRef}>
        {/* Node Spheres */}
        {nodes.map((node) => (
          <NodeSphere
            key={node.id}
            node={node}
            isHovered={hoveredNode === node.id}
            onHover={setHoveredNode}
          />
        ))}

        {/* Network connection lines */}
        <lineSegments geometry={lineGeometry}>
          <lineBasicMaterial color="#A61E2D" opacity={0.35} transparent linewidth={1} />
        </lineSegments>
      </group>

      <OrbitControls
        enableZoom={false}
        enablePan={false}
        autoRotate={!hoveredNode}
        autoRotateSpeed={1.0}
        rotateSpeed={0.7}
        dampingFactor={0.08}
        maxPolarAngle={Math.PI / 2 + 0.35}
        minPolarAngle={Math.PI / 2 - 0.35}
      />
    </>
  );
};

export const TechNetwork: React.FC = () => {
  return (
    <section 
      id="tech-network" 
      className="relative w-full py-28 px-6 md:px-16 bg-transparent flex flex-col items-center overflow-hidden border-t border-luxury-gold/5"
    >
      {/* Title Header - Positioned cleanly in normal flow above 3D Scene */}
      <div className="max-w-4xl mx-auto w-full text-center space-y-4 mb-10 relative z-10">
        <span className="font-sans text-xs tracking-[0.3em] uppercase text-luxury-gold font-bold">
          07 / System Connections
        </span>
        <h2 className="text-3xl md:text-5xl font-serif font-light uppercase tracking-wide text-luxury-text leading-tight">
          Interactive <span className="font-light italic text-transparent text-outline">Technology Network</span>
        </h2>
        <p className="font-sans text-xs md:text-sm text-[#A0A0A0] max-w-lg mx-auto leading-relaxed">
          Click and drag in 360° to navigate the cyber-physical pipeline constellation.
        </p>
      </div>

      {/* Interactive 3D Canvas Box */}
      <div 
        className="w-full max-w-5xl h-[480px] md:h-[580px] relative rounded-xl border border-luxury-gold/15 bg-[#090909]/80 shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
      >
        <Canvas camera={{ position: [0, 0, 3.4], fov: 48 }}>
          <NetworkScene />
        </Canvas>

        {/* Interaction badge indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-1.5 border border-white/10 bg-[#0E0E0E]/90 text-[10px] uppercase tracking-[0.2em] text-[#8E949D] font-mono pointer-events-none rounded-full flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-luxury-gold animate-pulse" />
          <span>Drag to orbit • Hover nodes to inspect</span>
        </div>
      </div>
    </section>
  );
};
