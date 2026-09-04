import { useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/**
 * Interactive particle field — the original hero design.
 * Thousands of small points forming a galaxy-like cloud with a slowly
 * rotating torus-knot wireframe as the central focal geometry.
 * Subtle parallax responds to the mouse (tracked at window level,
 * since the canvas itself is pointer-events-none), the camera drifts
 * on an idle animation, and particle count drops on mobile.
 */

interface FieldProps {
  count: number;
  still: boolean;
}

/** Deterministic PRNG (mulberry32) so the field is stable across renders. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function ParticleField({ count, still }: FieldProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const groupRef = useRef<THREE.Group>(null);
  const knotRef = useRef<THREE.Mesh>(null);
  const target = useRef({ x: 0, y: 0 });
  const ndc = useRef({ x: 0, y: 0 });

  // the canvas wrapper is pointer-events-none, so R3F's own pointer
  // would stay frozen — track the mouse at the window level instead
  useEffect(() => {
    const onMove = (e: PointerEvent) => {
      ndc.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      ndc.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  const { positions, colors } = useMemo(() => {
    const rand = seeded(20260904);
    const palette = [
      new THREE.Color("#7c9cff"),
      new THREE.Color("#5eead4"),
      new THREE.Color("#c084fc"),
      new THREE.Color("#3b4f8c"),
    ];
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // galaxy disc: wide radius band, thin vertical spread
      const radius = 5 + Math.pow(rand(), 1.6) * 9;
      const angle = rand() * Math.PI * 2;
      const spread = (rand() + rand() + rand() - 1.5) * 1.4;
      pos[i * 3] = Math.cos(angle) * radius;
      pos[i * 3 + 1] = spread;
      pos[i * 3 + 2] = Math.sin(angle) * radius;

      const c = palette[Math.floor(rand() * palette.length)];
      const dim = 0.45 + rand() * 0.55;
      col[i * 3] = c.r * dim;
      col[i * 3 + 1] = c.g * dim;
      col[i * 3 + 2] = c.b * dim;
    }
    return { positions: pos, colors: col };
  }, [count]);

  useFrame((state, delta) => {
    target.current.x = ndc.current.y * 0.12;
    target.current.y = ndc.current.x * 0.2;

    if (!still) {
      const g = groupRef.current;
      if (g) {
        g.rotation.y += delta * 0.02;
        g.rotation.x += (target.current.x - g.rotation.x) * 0.04;
        g.rotation.z += (target.current.y - g.rotation.z) * 0.04;
      }
      const knot = knotRef.current;
      if (knot) {
        knot.rotation.x += delta * 0.08;
        knot.rotation.y -= delta * 0.05;
      }
      const t = state.clock.elapsedTime;
      state.camera.position.y = 2.4 + Math.sin(t * 0.25) * 0.45;
      state.camera.position.x = Math.sin(t * 0.18) * 0.5;
      state.camera.lookAt(0, 0, 0);
    }
  });

  return (
    <group ref={groupRef} rotation={[0.42, 0, 0]}>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.055}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <mesh ref={knotRef} position={[0, 0.4, 0]} scale={1.9}>
        <torusKnotGeometry args={[1, 0.3, 220, 26]} />
        <meshBasicMaterial
          color="#7c9cff"
          wireframe
          transparent
          opacity={0.07}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function AdaptiveDprCapper() {
  const gl = useThree((state) => state.gl);
  gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  return null;
}

const REDUCED_MOTION =
  typeof window !== "undefined" &&
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const IS_MOBILE = typeof window !== "undefined" && window.innerWidth < 768;

export interface HeroCanvasProps {
  className?: string;
}

export default function HeroCanvas({ className }: HeroCanvasProps) {
  const count = IS_MOBILE ? 900 : 3800;
  // shift the field to the right so the headline keeps the left side;
  // on mobile it sits slightly right and above the copy
  const fx = IS_MOBILE ? 1.2 : 3.4;
  const fy = IS_MOBILE ? 0.8 : 0;
  const fscale = IS_MOBILE ? 0.78 : 1;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className ?? ""}`}
    >
      <Canvas
        camera={{ position: [0, 2.4, 13.5], fov: 58, near: 0.1, far: 60 }}
        dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 2)}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={REDUCED_MOTION ? "demand" : "always"}
      >
        <AdaptiveDprCapper />
        <fog attach="fog" args={["#0a0f1c", 12, 30]} />
        <group position={[fx, fy, 0]} scale={fscale}>
          <ParticleField count={count} still={REDUCED_MOTION} />
        </group>
      </Canvas>
    </div>
  );
}
