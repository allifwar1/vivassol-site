"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, MeshDistortMaterial, Float, Torus, Sphere, Box, Octahedron, Torus as T2, MeshWobbleMaterial } from "@react-three/drei";
import * as THREE from "three";

/* ─── Cena 1 — Bebê: nó tórico pulsante, mola ao mouse ───────────── */
function ScenaBebe({ mx, my }: { mx: number; my: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const targetRot = useRef([0, 0]);
  useFrame((_, d) => {
    targetRot.current[0] += (my * 0.8 - targetRot.current[0]) * 0.05;
    targetRot.current[1] += (mx * 0.8 - targetRot.current[1]) * 0.05;
    mesh.current.rotation.x = targetRot.current[0];
    mesh.current.rotation.y += d * 0.3 + targetRot.current[1] * 0.01;
  });
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={1.2}>
      <mesh ref={mesh} castShadow>
        <torusKnotGeometry args={[1.4, 0.42, 200, 32]} />
        <MeshDistortMaterial color="#D02060" distort={0.35} speed={2} roughness={0} metalness={0.6} />
      </mesh>
    </Float>
  );
}

/* ─── Cena 2 — Caneca: cilindro + anel (asa), rotação livre ──────── */
function ScenaCaneca({ mx, my }: { mx: number; my: number }) {
  const grp = useRef<THREE.Group>(null!);
  useFrame((_, d) => {
    grp.current.rotation.y += d * 0.6 + mx * 0.015;
    grp.current.rotation.x += (my * 0.4 - grp.current.rotation.x) * 0.03;
  });
  return (
    <group ref={grp}>
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[0.85, 0.75, 2, 64]} />
        <meshStandardMaterial color="#F5801A" roughness={0.1} metalness={0.7} />
      </mesh>
      {/* asa */}
      <mesh position={[1.1, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.45, 0.12, 16, 32, Math.PI]} />
        <meshStandardMaterial color="#F5C200" roughness={0.1} metalness={0.7} />
      </mesh>
    </group>
  );
}

/* ─── Cena 3 — Camiseta: esferas dispersas que fogem do mouse ────── */
function ScenaCamiseta({ mx, my }: { mx: number; my: number }) {
  const pts = useRef(
    Array.from({ length: 22 }, (_, i) => ({
      ox: (Math.random() - 0.5) * 5,
      oy: (Math.random() - 0.5) * 4,
      oz: (Math.random() - 0.5) * 2,
      phase: Math.random() * Math.PI * 2,
      size: 0.12 + Math.random() * 0.28,
      color: ["#1A7ACA", "#00A88A", "#68B82A", "#F5C200"][Math.floor(Math.random() * 4)],
    }))
  );
  const refs = useRef<THREE.Mesh[]>([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    refs.current.forEach((m, i) => {
      if (!m) return;
      const p = pts.current[i];
      m.position.x = p.ox + Math.sin(t * 0.6 + p.phase) * 0.25 - mx * 0.3;
      m.position.y = p.oy + Math.cos(t * 0.5 + p.phase) * 0.2 - my * 0.3;
      m.position.z = p.oz;
      m.rotation.x += 0.01;
      m.rotation.y += 0.008;
    });
  });
  return (
    <>
      {pts.current.map((p, i) => (
        <mesh key={i} ref={(el) => { if (el) refs.current[i] = el; }}>
          <sphereGeometry args={[p.size, 16, 16]} />
          <meshStandardMaterial color={p.color} roughness={0.2} metalness={0.5} />
        </mesh>
      ))}
    </>
  );
}

/* ─── Cena 4 — Presentes: dodecaedro lento, inércia pesada ────────── */
function ScenaPresentes({ mx, my }: { mx: number; my: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const vel = useRef([0, 0]);
  useFrame((_, d) => {
    vel.current[0] += (mx * 0.6 - vel.current[0]) * 0.02;
    vel.current[1] += (-my * 0.6 - vel.current[1]) * 0.02;
    mesh.current.rotation.y += vel.current[0] * d * 1.5 + d * 0.15;
    mesh.current.rotation.x += vel.current[1] * d * 1.5;
  });
  return (
    <Float speed={1.2} floatIntensity={0.8}>
      <mesh ref={mesh} castShadow scale={1.5}>
        <dodecahedronGeometry args={[1.2, 0]} />
        <MeshWobbleMaterial color="#7B2DBE" factor={0.15} speed={1} roughness={0} metalness={0.8} />
      </mesh>
    </Float>
  );
}

/* ─── Cena 5 — Marca Vivassol: anel + esfera central, hiper rápido ── */
function ScenaMarca({ mx, my }: { mx: number; my: number }) {
  const inner = useRef<THREE.Mesh>(null!);
  const ring1 = useRef<THREE.Mesh>(null!);
  const ring2 = useRef<THREE.Mesh>(null!);
  useFrame((state, d) => {
    const t = state.clock.elapsedTime;
    inner.current.rotation.x = my * 0.9;
    inner.current.rotation.y += d * 0.8 + mx * 0.02;
    ring1.current.rotation.x = Math.sin(t * 0.7) * 0.5 + my * 0.4;
    ring1.current.rotation.y += d * 0.5;
    ring2.current.rotation.z = Math.cos(t * 0.5) * 0.5;
    ring2.current.rotation.y += d * 0.4;
  });
  return (
    <>
      <mesh ref={inner} castShadow>
        <icosahedronGeometry args={[0.9, 1]} />
        <MeshDistortMaterial color="#E84525" distort={0.4} speed={3} roughness={0} metalness={0.7} />
      </mesh>
      <mesh ref={ring1}>
        <torusGeometry args={[1.8, 0.08, 16, 120]} />
        <meshStandardMaterial color="#F5C200" roughness={0} metalness={1} />
      </mesh>
      <mesh ref={ring2} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.2, 0.06, 16, 120]} />
        <meshStandardMaterial color="#1A7ACA" roughness={0} metalness={1} />
      </mesh>
    </>
  );
}

const SCENES = [ScenaBebe, ScenaCaneca, ScenaCamiseta, ScenaPresentes, ScenaMarca];

export function SlideScene({ index, mx, my }: { index: number; mx: number; my: number }) {
  const SceneComp = SCENES[index];
  return (
    <Canvas
      camera={{ position: [0, 0, 5.5], fov: 50 }}
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%" }}
    >
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} castShadow />
      <pointLight position={[-5, -3, 2]} intensity={0.8} />
      <SceneComp mx={mx} my={my} />
    </Canvas>
  );
}
