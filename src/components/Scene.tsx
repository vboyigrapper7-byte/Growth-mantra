import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Float } from "@react-three/drei";

function Stars(props: any) {
  const ref = useRef<any>();

  const sphere = useMemo(() => {
    const temp = new Float32Array(5000 * 3);
    for (let i = 0; i < 5000; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      const r = 1.5 * Math.cbrt(Math.random());
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);
      temp[i * 3] = x;
      temp[i * 3 + 1] = y;
      temp[i * 3 + 2] = z;
    }
    return temp;
  }, []);

  useFrame((_state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#00f2ff"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

function FloatingShapes() {
  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <mesh position={[1, -0.5, 1]} rotation={[0, 0.5, 0]}>
        <torusGeometry args={[0.4, 0.1, 16, 32] as any} />
        <meshStandardMaterial color="#b026ff" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh position={[-1.2, 0.8, -1]} rotation={[0.5, 0, 0]}>
        <icosahedronGeometry args={[0.3, 0] as any} />
        <meshStandardMaterial color="#00f2ff" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh position={[0.5, 1.5, -2]} rotation={[0, 0, 0.5]}>
        <octahedronGeometry args={[0.2, 0] as any} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.1} />
      </mesh>
    </Float>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-slate-900 via-[#0a0f1e] to-black">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
        <FloatingShapes />
        <ambientLight intensity={0.5} />
      </Canvas>
    </div>
  );
}
