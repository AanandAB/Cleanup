"use client";

import { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

/* ────────────────────────────────────────────────────────────
   Clean UP hero scene — a stylized room split into a "before"
   (dull) half and an "after" (clean, reflective) half. A branded
   squeegee sweeps left → right as the user scrolls, revealing the
   clean material. Mouse movement adds subtle camera parallax.
   All WebGL is decorative — the hero copy stays normal HTML.
   ──────────────────────────────────────────────────────────── */

const WIDTH = 10; // room width in world units (x: -5..5)
const FRONT = -5;

function useScrollProgress() {
  const progress = useRef(0);
  useEffect(() => {
    const onScroll = () => {
      // 0 at top → 1 after scrolling one viewport height.
      const p = Math.min(1, Math.max(0, window.scrollY / window.innerHeight));
      progress.current = p;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return progress;
}

/** Sweep + material reveal, driven by smoothed scroll progress. */
function Room() {
  const progress = useScrollProgress();
  const visual = useRef(0);

  const squeegee = useRef<THREE.Group>(null);
  const cleanFloor = useRef<THREE.Mesh>(null);
  const cleanWall = useRef<THREE.Mesh>(null);
  const glassMat = useRef<THREE.MeshStandardMaterial>(null);

  const dirtyGlass = useRef(new THREE.Color("#3f4a54"));
  const cleanGlass = useRef(new THREE.Color("#bfe0ff"));

  useFrame((_, delta) => {
    // Smooth toward the scroll target (no jumpy scrub).
    visual.current += (progress.current - visual.current) * Math.min(1, delta * 5);
    const t = visual.current;
    const front = FRONT + WIDTH * t; // squeegee x position

    if (squeegee.current) squeegee.current.position.x = front;

    // Clean overlays grow from the left edge to follow the squeegee.
    if (cleanFloor.current) {
      cleanFloor.current.scale.x = Math.max(0.0001, t);
      cleanFloor.current.position.x = FRONT + (WIDTH / 2) * t;
    }
    if (cleanWall.current) {
      cleanWall.current.scale.x = Math.max(0.0001, t);
      cleanWall.current.position.x = FRONT + (WIDTH / 2) * t;
    }

    // Window glass: grimy → clear.
    if (glassMat.current) {
      glassMat.current.color.lerpColors(dirtyGlass.current, cleanGlass.current, t);
      glassMat.current.opacity = 0.9 - 0.55 * t;
    }
  });

  return (
    <group>
      {/* ── dirty room (base) ── */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[WIDTH, 7]} />
        <meshStandardMaterial color="#9aa0a8" roughness={1} />
      </mesh>
      <mesh position={[0, 2, -3.2]}>
        <planeGeometry args={[WIDTH, 4.2]} />
        <meshStandardMaterial color="#b3ab9d" roughness={1} />
      </mesh>

      {/* ── clean overlays (revealed left → right) ── */}
      <mesh ref={cleanFloor} rotation={[-Math.PI / 2, 0, 0]} position={[FRONT, 0.02, 0]} scale={[0.0001, 1, 1]}>
        <planeGeometry args={[WIDTH, 7]} />
        <meshStandardMaterial color="#eef2f7" roughness={0.18} metalness={0.25} />
      </mesh>
      <mesh ref={cleanWall} position={[FRONT, 2, -3.18]} scale={[0.0001, 1, 1]}>
        <planeGeometry args={[WIDTH, 4.2]} />
        <meshStandardMaterial color="#f2f6fb" roughness={0.35} metalness={0.05} />
      </mesh>

      {/* ── window (glass gets clearer as the sweep passes) ── */}
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

      {/* ── the cleaning tool (sweeps left → right) ── */}
      <group ref={squeegee} position={[FRONT, 0.9, 0.2]}>
        {/* handle */}
        <mesh position={[0, 0.5, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 1.2, 16]} />
          <meshStandardMaterial color="#3159c7" roughness={0.4} />
        </mesh>
        {/* blade */}
        <mesh position={[0, -0.15, 0.35]} rotation={[0.6, 0, 0]}>
          <boxGeometry args={[0.9, 0.05, 0.55]} />
          <meshStandardMaterial color="#cfd8e6" roughness={0.2} metalness={0.7} />
        </mesh>
        {/* scrub strip */}
        <mesh position={[0, -0.32, 0.15]}>
          <boxGeometry args={[0.9, 0.18, 0.12]} />
          <meshStandardMaterial color="#4774f6" roughness={0.5} />
        </mesh>
      </group>
    </group>
  );
}

/** Subtle camera parallax that follows the pointer (desktop feel). */
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
      camera={{ position: [0, 1.4, 6.5], fov: 40 }}
      className="!absolute inset-0"
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[6, 8, 6]} intensity={1.1} />
      <pointLight position={[3, 3, 2]} intensity={0.5} color="#bfe0ff" />
      <Room />
      <CameraRig />
    </Canvas>
  );
}
