import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Environment, PerspectiveCamera, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';

const Shard = () => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHover] = useState(false);

  useFrame((state) => {
    if (!mesh.current) return;
    
    // Smooth idle rotation
    mesh.current.rotation.x += 0.005;
    mesh.current.rotation.y += 0.008;

    // Follow mouse subtly
    const targetX = state.mouse.x * 0.4;
    const targetY = state.mouse.y * 0.4;
    mesh.current.position.x = THREE.MathUtils.lerp(mesh.current.position.x, targetX, 0.1);
    mesh.current.position.y = THREE.MathUtils.lerp(mesh.current.position.y, targetY, 0.1);
  });

  return (
    <mesh
      ref={mesh}
      onPointerOver={() => setHover(true)}
      onPointerOut={() => setHover(false)}
      scale={hovered ? 1.2 : 1}
      transition-all="true"
    >
      <icosahedronGeometry args={[1, 0]} />
      <MeshDistortMaterial
        color="#ffc107" // Brand Yellow
        speed={hovered ? 6 : 2}
        distort={hovered ? 0.4 : 0.25}
        metalness={0.9}
        roughness={0.1}
        emissive="#ffc107"
        emissiveIntensity={hovered ? 0.5 : 0.2}
      />
    </mesh>
  );
};

const Logo3D: React.FC = () => {
  return (
    <div className="w-12 h-12 relative cursor-pointer group">
      <Canvas
        flat
        shadows
        gl={{ antialias: true, alpha: true }}
        camera={{ position: [0, 0, 4], fov: 45 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 3.5]} />
        <AdaptiveDpr pixelated />
        
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#ffc107" />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
        
        <Float 
          speed={2} 
          rotationIntensity={1.5} 
          floatIntensity={1.2}
        >
          <Shard />
        </Float>
        
        <Environment preset="night" />
      </Canvas>
      
      {/* Glow Effect Layer */}
      <div className="absolute inset-0 rounded-full bg-brand-yellow/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
    </div>
  );
};

export default Logo3D;
