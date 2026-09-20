"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ────────────────────────────────────────────────────────────
   Clean UP hero scene — a stylized room split into a "before"
   (dull) half and an "after" (clean, reflective) half.

   On mount the scene plays ONE sweep (dirty → clean, ~2.5s),
   then idles: the tool gently bobs, sparkles twinkle over the
   clean area, and the camera parallaxes with the pointer.
   No scroll dependency — WebGL stays purely decorative so the
   hero copy remains plain, crawler-readable HTML.
   ──────────────────────────────────────────────────────────── */

const WIDTH = 10; // x: -5..5
const FRONT = -5;
const SWEEP_SECONDS = 2.5;

function easeOutCubic(x: number) {
  return 1 - Math.pow(1 - x, 3);
}

/** One-time dirty→clean sweep, then a gentle idle bob. */
function Room() {
  const elapsed = useRef(0);

  const squeegee = useRef<THREE.Group>(null);
  const cleanFloor = useRef<THREE.Mesh>(null);
  const cleanWall = useRef<THREE.Mesh>(null);
  const glassMat = useRef<THREE.MeshStandardMaterial>(null);

  const dirtyGlass = useRef(new THREE.Color("#3f4a54"));
  const cleanGlass = useRef(new THREE.Color("#bfe0ff"));

  useFrame((_, delta) => {
    elapsed.current += delta;

    // Intro sweep: 0 → 1 over SWEEP_SECONDS, then hold at 1.
    const raw = Math.min(1, elapsed.current / SWEEP_SECONDS);
    const t = easeOutCubic(raw);
    const front = FRONT + WIDTH * t;

    if (squeegee.current) {
      squeegee.current.position.x = front;
      // gentle idle bob once the sweep is done
      squeegee.current.position.y = 0.9 + Math.sin(elapsed.current * 1.6) * 0.04;
    }

    if (cleanFloor.current) {
      cleanFloor.current.scale.x = Math.max(0.0001, t);
      cleanFloor.current.position.x = FRONT + (WIDTH / 2) * t;
    }
    if (cleanWall.current) {
      cleanWall.current.scale.x = Math.max(0.0001, t);
      cleanWall.current.position.x = FRONT + (WIDTH / 2) * t;
    }

    if (glassMat.current) {
      glassMat.current.color.lerpColors(dirtyGlass.current, cleanGlass.current, t);
      glassMat.current.opacity = 0.9 - 0.55 * t;
    }
  });

  return (
    <group>
      {/* dirty room (base) */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[WIDTH, 7]} />
        <meshStandardMaterial color="#9aa0a8" roughness={1} />
      </mesh>
      <mesh position={[0, 2, -3.2]}>
        <planeGeometry args={[WIDTH, 4.2]} />
        <meshStandardMaterial color="#b3ab9d" roughness={1} />
      </mesh>

      {/* clean overlays (revealed left → right) */}
      <mesh ref={cleanFloor} rotation={[-Math.PI / 2, 0, 0]} position={[FRONT, 0.02, 0]} scale={[0.0001, 1, 1]}>
        <planeGeometry args={[WIDTH, 7]} />
        <meshStandardMaterial color="#eef2f7" roughness={0.18} metalness={0.25} />
      </mesh>
      <mesh ref={cleanWall} position={[FRONT, 2, -3.18]} scale={[0.0001, 1, 1]}>
        <planeGeometry args={[WIDTH, 4.2]} />
        <meshStandardMaterial color="#f2f6fb" roughness={0.35} metalness={0.05} />
      </mesh>

      {/* window (glass clears as the sweep passes) */}
      <group position={[0, 2.15, -3.1]}>
        <mesh>
          <planeGeometry args={[2.6, 2.1]} />
          <meshStandardMaterial color="#e9eef5" roughness={0.5} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <planeGeometry args={[2.25, 1.8]} />
          <meshStandardMaterial
            ref={glassMat}
            color="#3f4a54"
            transparent
            opacity={0.9}
            roughness={0.1}
            metalness={0.4}
          />
        </mesh>
      </group>

      {/* cleaning tool */}
      <group ref={squeegee} position={[FRONT, 0.9, 0.2]}>
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.2, 16]} />
          <meshStandardMaterial color="#3159c7" roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.15, 0.35]} rotation={[0.6, 0, 0]}>
          <boxGeometry args={[0.9, 0.05, 0.55]} />
          <meshStandardMaterial color="#cfd8e6" roughness={0.2} metalness={0.7} />
        </mesh>
        <mesh position={[0, -0.32, 0.15]}>
          <boxGeometry args={[0.9, 0.18, 0.12]} />
          <meshStandardMaterial color="#4774f6" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/** Tiny twinkling sparkles over the clean area. */
function Sparkles({ count = 14 }: { count?: number }) {
  const ref = useRef<THREE.Group>(null);
  const seeds = useRef(
    Array.from({ length: count }, () => ({
      x: (Math.random() - 0.5) * 8,
      y: 0.4 + Math.random() * 2.6,
      z: -2.6 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
      speed: 0.6 + Math.random() * 1.4,
      scale: 0.35 + Math.random() * 0.8,
    })),
  );

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current?.children.forEach((child, i) => {
      const s = seeds.current[i];
      const twinkle = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase));
      child.scale.setScalar(s.scale * twinkle);
    });
  });

  return (
    <group ref={ref}>
      {seeds.current.map((s, i) => (
        <mesh key={i} position={[s.x, s.y, s.z]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#cfe0ff" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/** Subtle camera parallax that follows the pointer. */
function CameraRig() {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth - 0.5) * 1.2;
      target.current.y = (e.clientY / window.innerHeight - 0.5) * 0.7;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useFrame((_, delta) => {
    const k = Math.min(1, delta * 3);
    camera.position.x += (target.current.x - camera.position.x) * k;
    camera.position.y += (target.current.y - camera.position.y) * k;
    camera.lookAt(0, 1.2, -1);
  });

  return null;
}

export function CleaningScene() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 1.4, 6.5], fov:40 }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 6]} intensity={1.1} />
      <pointLight position={[3, 3, 2]} intensity={0.5} color="#bfe0ff" />
      <Room />
      <Sparkles />
      <CameraRig />
    </Canvas>
  );
}
