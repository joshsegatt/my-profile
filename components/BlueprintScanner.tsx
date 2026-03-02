import * as React from 'react';
import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Grid, Float, PerspectiveCamera, Stars } from '@react-three/drei';
import * as THREE from 'three';

const LaserScanner = ({ active }: { active: boolean }) => {
    const laserRef = useRef<THREE.Mesh>(null);
    const speed = active ? 2 : 0.5;

    useFrame((state) => {
        if (laserRef.current) {
            laserRef.current.position.z = Math.sin(state.clock.getElapsedTime() * speed) * 5;
        }
    });

    return (
        <mesh ref={laserRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
            <planeGeometry args={[20, 0.08]} />
            <meshBasicMaterial
                color="#000"
                transparent
                opacity={active ? 0.9 : 0.6}
                side={THREE.DoubleSide}
            />
            <pointLight position={[0, 0, 0]} intensity={active ? 1 : 0.3} color="#000" distance={8} />
        </mesh>
    );
};

const DataNodes = ({ active }: { active: boolean }) => {
    const nodes = useMemo(() => {
        const temp = [];
        for (let i = 0; i < 60; i++) {
            temp.push({
                position: [
                    (Math.random() - 0.5) * 20,
                    Math.random() * 3,
                    (Math.random() - 0.5) * 20
                ],
                scale: Math.random() * 0.04 + 0.01
            });
        }
        return temp;
    }, []);

    const nodesRef = useRef<THREE.Group>(null);
    useFrame((state) => {
        if (nodesRef.current && active) {
            nodesRef.current.rotation.y += 0.01;
        }
    });

    return (
        <group ref={nodesRef}>
            {nodes.map((node, i) => (
                <mesh key={i} position={node.position as any}>
                    <boxGeometry args={[node.scale, node.scale, node.scale]} />
                    <meshBasicMaterial color="#000" transparent opacity={active ? 0.4 : 0.2} />
                </mesh>
            ))}
        </group>
    );
};

interface BlueprintScannerProps {
    active?: boolean;
}

const BlueprintComponent = ({ position, type, active }: { position: [number, number, number], type: 'data' | 'ai' | 'cloud', active: boolean }) => {
    const meshRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = React.useState(false);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.position.y = position[1] + Math.sin(state.clock.getElapsedTime() + position[0]) * 0.2;
            if (active) {
                meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
            } else {
                meshRef.current.scale.lerp(new THREE.Vector3(0, 0, 0), 0.1);
            }
        }
    });

    return (
        <group ref={meshRef} position={position} scale={[0, 0, 0]}>
            {type === 'data' && (
                <mesh>
                    <boxGeometry args={[0.8, 1.2, 0.8]} />
                    <meshStandardMaterial color="#000" metalness={0.8} roughness={0.2} transparent opacity={0.6} />
                    {/* Data lines decoration */}
                    <Grid position={[0, 0, 0]} args={[0.8, 0.8]} cellColor="#fff" sectionColor="#fff" infiniteGrid={false} opacity={0.5} />
                </mesh>
            )}
            {type === 'ai' && (
                <mesh>
                    <sphereGeometry args={[0.5, 16, 16]} />
                    <meshStandardMaterial color="#000" wireframe />
                    <pointLight intensity={0.5} color="#000" distance={2} />
                </mesh>
            )}
            {type === 'cloud' && (
                <mesh>
                    <boxGeometry args={[1.5, 0.3, 1.5]} />
                    <meshStandardMaterial color="#000" transparent opacity={0.4} />
                </mesh>
            )}
        </group>
    );
};

const BlueprintScanner: React.FC<BlueprintScannerProps> = ({ active = false }) => {
    const components = useMemo(() => [
        { position: [-4, 0.5, -3], type: 'data' as const },
        { position: [4, 1, -5], type: 'ai' as const },
        { position: [0, 0.8, -8], type: 'cloud' as const },
        { position: [-6, 1.2, -6], type: 'data' as const },
    ], []);

    return (
        <div className="absolute inset-0 z-0 pointer-events-none opacity-50 overflow-hidden">
            <Canvas camera={{ position: [12, 10, 12], fov: 45 }}>
                <ambientLight intensity={active ? 0.4 : 0.2} />
                <pointLight position={[15, 15, 15]} intensity={0.5} />

                <Float speed={active ? 3 : 1.5} rotationIntensity={0.5} floatIntensity={0.5}>
                    <group position={[0, -2, 0]}>
                        <Grid
                            infiniteGrid
                            fadeDistance={40}
                            fadeStrength={5}
                            cellSize={1}
                            cellThickness={1}
                            cellColor="#222"
                            sectionSize={5}
                            sectionThickness={1.5}
                            sectionColor="#111"
                        />

                        <LaserScanner active={active} />
                        <DataNodes active={active} />

                        {/* Architectural Components */}
                        {components.map((c, i) => (
                            <BlueprintComponent key={i} position={c.position} type={c.type} active={active} />
                        ))}
                    </group>
                </Float>
                <Stars radius={100} depth={50} count={2000} factor={4} saturation={0} fade speed={1} />
            </Canvas>
        </div>
    );
};

export default BlueprintScanner;
