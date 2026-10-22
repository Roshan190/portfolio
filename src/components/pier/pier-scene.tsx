"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html, MeshReflectorMaterial, useTexture } from "@react-three/drei";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
  Noise,
  Vignette,
} from "@react-three/postprocessing";
import * as THREE from "three";
import { getBasePath } from "@/lib/url";
import {
  cameraViews,
  sceneProjects,
  type SceneProject,
  type ViewpointId,
} from "@/lib/projects";

type PierSceneProps = {
  view: ViewpointId;
  hovered: string | null;
  reduced: boolean;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
};

export function PierScene({ view, hovered, reduced, onHover, onSelect }: PierSceneProps) {
  return (
    <>
      <color attach="background" args={["#05070b"]} />
      <fog attach="fog" args={["#070b10", 8, 26]} />
      <CameraRig view={view} reduced={reduced} />
      <hemisphereLight args={["#b7ddd8", "#1a120c", 0.38]} />
      <directionalLight position={[-6, 7, 3]} intensity={0.42} color="#8fd0cc" />
      <Water />
      <PierDeck />
      <Scenery />
      <StringLights />
      <Fireflies />
      <Moon />
      {sceneProjects.map((item) => (
        <Marker
          key={item.slug}
          item={item}
          hot={hovered === item.slug}
          onHover={onHover}
          onSelect={onSelect}
        />
      ))}
      <EffectComposer multisampling={0} enableNormalPass={false}>
        <Bloom intensity={0.42} luminanceThreshold={0.7} mipmapBlur />
        <DepthOfField focusDistance={0.012} focalLength={0.018} bokehScale={0.8} />
        <Noise opacity={0.12} />
        <Vignette eskil={false} offset={0.2} darkness={0.72} />
      </EffectComposer>
    </>
  );
}

function CameraRig({ view, reduced }: { view: ViewpointId; reduced: boolean }) {
  const camera = useThree((state) => state.camera);
  const look = useRef(new THREE.Vector3(0, 1.05, -0.4));
  const desired = useRef(new THREE.Vector3());
  const desiredLook = useRef(new THREE.Vector3());
  const started = useRef(false);

  useLayoutEffect(() => {
    const arrive = cameraViews.arrive;
    camera.position.set(...arrive.position);
    look.current.set(...arrive.lookAt);
    started.current = true;
  }, [camera]);

  useFrame((state, delta) => {
    if (!started.current) return;
    const shot = cameraViews[view];
    const t = state.clock.elapsedTime;
    const intro = reduced ? 1 : Math.min(1, t / 3.4);
    const sway = reduced ? 0 : 1;
    const driftX = Math.sin(t * 0.16) * 0.07 * sway;
    const driftY = Math.cos(t * 0.13) * 0.04 * sway;
    const px = state.pointer.x * 0.28 * sway;
    const py = state.pointer.y * 0.12 * sway;
    desired.current.set(
      shot.position[0] + driftX + px,
      shot.position[1] + driftY + py,
      shot.position[2],
    );
    desiredLook.current.set(...shot.lookAt);
    const lambda = reduced ? 8 : 0.55 + intro * 1.35;
    const alpha = 1 - Math.exp(-lambda * delta);
    camera.position.lerp(desired.current, alpha);
    look.current.lerp(desiredLook.current, alpha);
    camera.lookAt(look.current);
  });

  return null;
}

function Water() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
      <planeGeometry args={[48, 48]} />
      <MeshReflectorMaterial
        resolution={512}
        blur={[280, 90]}
        mixBlur={1}
        mixStrength={1.35}
        roughness={1}
        depthScale={1.05}
        minDepthThreshold={0.35}
        maxDepthThreshold={1.3}
        color="#071018"
        metalness={0.55}
        mirror={0.48}
      />
    </mesh>
  );
}

function PierDeck() {
  const planks = [];
  for (let i = 0; i < 16; i += 1) {
    planks.push(
      <mesh key={i} position={[0, 0.2, 1.2 - i * 0.28]}>
        <boxGeometry args={[3.15, 0.07, 0.22]} />
        <meshStandardMaterial color={i % 2 === 0 ? "#3a2c1e" : "#2a2016"} roughness={0.92} />
      </mesh>,
    );
  }
  const piles = [-1.15, 1.15].flatMap((x) =>
    [-1.4, 0.1, 1.05].map((z) => (
      <mesh key={`${x}-${z}`} position={[x, -0.15, z]}>
        <cylinderGeometry args={[0.055, 0.075, 0.7, 6]} />
        <meshStandardMaterial color="#1a140f" roughness={1} />
      </mesh>
    )),
  );
  return (
    <group>
      {planks}
      {piles}
      <Rail x={-1.55} />
      <Rail x={1.55} />
      <Post position={[-1.55, 0.2, 1.15]} />
      <Post position={[1.55, 0.2, 1.15]} />
      <Post position={[-1.55, 0.2, -2.15]} />
      <Post position={[1.55, 0.2, -2.15]} />
      <HangingLantern position={[-1.55, 1.55, 1.15]} />
      <HangingLantern position={[1.55, 1.55, 1.15]} />
      <HangingLantern position={[0.1, 1.85, -2.15]} />
    </group>
  );
}

function Rail({ x }: { x: number }) {
  return (
    <mesh position={[x, 0.72, -0.5]}>
      <boxGeometry args={[0.04, 0.04, 3.4]} />
      <meshStandardMaterial color="#24180f" />
    </mesh>
  );
}

function Post({ position }: { position: [number, number, number] }) {
  return (
    <mesh position={[position[0], position[1] + 0.55, position[2]]}>
      <boxGeometry args={[0.07, 1.15, 0.07]} />
      <meshStandardMaterial color="#2a1c12" />
    </mesh>
  );
}

function HangingLantern({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[0.12, 0.16, 0.12]} />
        <meshStandardMaterial color="#ffd7a1" emissive="#ff9a3c" emissiveIntensity={2.2} />
      </mesh>
      <pointLight color="#ffb15a" intensity={0.8} distance={2.6} decay={2} />
    </group>
  );
}

function Scenery() {
  return (
    <group>
      <Tree position={[-4.4, -0.02, -0.6]} scale={1.15} />
      <Tree position={[4.6, -0.02, 0.4]} scale={0.9} />
      <Rock position={[-3.3, -0.05, 2.1]} scale={0.7} />
      <Rock position={[3.5, -0.08, 1.7]} scale={0.95} />
      <Boat position={[3.1, 0.02, 2.7]} />
    </group>
  );
}

function Tree({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: number;
}) {
  return (
    <group position={position} scale={scale}>
      <mesh position={[0, 0.7, 0]}>
        <cylinderGeometry args={[0.08, 0.12, 1.4, 6]} />
        <meshStandardMaterial color="#140f0c" />
      </mesh>
      <mesh position={[0, 1.7, 0]}>
        <coneGeometry args={[0.7, 1.3, 6]} />
        <meshStandardMaterial color="#102226" />
      </mesh>
      <mesh position={[0, 2.35, 0]}>
        <coneGeometry args={[0.48, 1, 6]} />
        <meshStandardMaterial color="#163034" />
      </mesh>
    </group>
  );
}

function Rock({
  position,
  scale,
}: {
  position: [number, number, number];
  scale: number;
}) {
  return (
    <mesh position={position} scale={scale} rotation={[0.2, 0.4, 0]}>
      <dodecahedronGeometry args={[0.55, 0]} />
      <meshStandardMaterial color="#12161c" roughness={1} />
    </mesh>
  );
}

function Boat({ position }: { position: [number, number, number] }) {
  return (
    <group position={position} rotation={[0, 0.4, 0]}>
      <mesh>
        <boxGeometry args={[0.7, 0.16, 0.28]} />
        <meshStandardMaterial color="#3a2a1c" />
      </mesh>
      <mesh position={[0, 0.12, 0]}>
        <boxGeometry args={[0.45, 0.08, 0.16]} />
        <meshStandardMaterial color="#24180f" />
      </mesh>
    </group>
  );
}

function StringLights() {
  const bulbs = useMemo(() => {
    const from = new THREE.Vector3(-1.55, 1.7, 1.15);
    const to = new THREE.Vector3(1.55, 1.7, 1.15);
    const nodes: [number, number, number][] = [];
    for (let i = 0; i <= 12; i += 1) {
      const t = i / 12;
      const y = 1.7 - Math.sin(t * Math.PI) * 0.28;
      nodes.push([from.x + (to.x - from.x) * t, y, from.z]);
    }
    return nodes;
  }, []);
  return (
    <group>
      {bulbs.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.035, 8, 8]} />
          <meshStandardMaterial color="#ffe1b5" emissive="#ffb15a" emissiveIntensity={2.6} />
        </mesh>
      ))}
    </group>
  );
}

function Fireflies() {
  const count = 28;
  const ref = useRef<THREE.Points>(null);
  const bases = useMemo(() => {
    const values: [number, number, number][] = [];
    let seed = 20261022;
    const next = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 2 ** 32;
    };
    for (let i = 0; i < count; i += 1) {
      values.push([(next() - 0.5) * 8, 0.5 + next() * 2.1, (next() - 0.5) * 7]);
    }
    return values;
  }, []);
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    bases.forEach((base, i) => {
      positions[i * 3] = base[0];
      positions[i * 3 + 1] = base[1];
      positions[i * 3 + 2] = base[2];
    });
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return geo;
  }, [bases]);

  useFrame(({ clock }) => {
    const points = ref.current;
    if (!points) return;
    const attr = points.geometry.getAttribute("position");
    const t = clock.elapsedTime;
    for (let i = 0; i < count; i += 1) {
      const base = bases[i];
      attr.setX(i, base[0] + Math.sin(t * 0.35 + i) * 0.12);
      attr.setY(i, base[1] + Math.sin(t * 0.8 + i * 1.3) * 0.08);
      attr.setZ(i, base[2] + Math.cos(t * 0.28 + i) * 0.1);
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        color="#ffe1a8"
        size={0.055}
        transparent
        opacity={0.9}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

function Moon() {
  const texture = useTexture(`${getBasePath()}/glow.png`);
  return (
    <sprite position={[-4.2, 3.4, -7]} scale={[1.8, 1.8, 1]}>
      <spriteMaterial map={texture} transparent color="#d7fff6" depthWrite={false} opacity={0.85} />
    </sprite>
  );
}

function Marker({
  item,
  hot,
  onHover,
  onSelect,
}: {
  item: SceneProject;
  hot: boolean;
  onHover: (slug: string | null) => void;
  onSelect: (slug: string) => void;
}) {
  const ref = useRef<THREE.Group>(null);
  const lift = useRef(0);

  useFrame((_, delta) => {
    const goal = hot ? 0.22 : 0;
    lift.current += (goal - lift.current) * (1 - Math.exp(-7 * delta));
    if (ref.current) {
      ref.current.position.y = item.position[1] + lift.current;
      const scale = 1 + lift.current * 0.18;
      ref.current.scale.setScalar(scale);
    }
  });

  return (
    <group
      ref={ref}
      position={item.position}
      onPointerOver={(event) => {
        event.stopPropagation();
        onHover(item.slug);
      }}
      onPointerOut={(event) => {
        event.stopPropagation();
        onHover(null);
      }}
      onClick={(event) => {
        event.stopPropagation();
        onSelect(item.slug);
      }}
    >
      {item.kind === "house" ? (
        <group scale={1.22}>
          <LanternHouse hot={hot} />
        </group>
      ) : null}
      {item.kind === "screen" ? <Screen hot={hot} /> : null}
      {item.kind === "poster" ? <Poster hot={hot} /> : null}
      {item.kind === "lantern" ? <StandingLantern hot={hot} /> : null}
      {hot ? (
        <Html center position={[0, 1.85, 0]} distanceFactor={7} zIndexRange={[8, 0]}>
          <div className="float-label">{item.project.name}</div>
        </Html>
      ) : null}
    </group>
  );
}

function LanternHouse({ hot }: { hot: boolean }) {
  const glow = hot ? 4.4 : 2.5;
  return (
    <group>
      <mesh position={[0, 0.38, 0]}>
        <boxGeometry args={[1.2, 0.72, 0.86]} />
        <meshStandardMaterial color="#2a1c12" roughness={0.82} />
      </mesh>
      <mesh position={[0, 0.9, 0]} rotation={[0, Math.PI / 4, 0]}>
        <coneGeometry args={[0.98, 0.42, 4]} />
        <meshStandardMaterial color="#4a3018" />
      </mesh>
      <mesh position={[0, 0.4, 0.44]}>
        <planeGeometry args={[0.62, 0.34]} />
        <meshStandardMaterial color="#ffe1b5" emissive="#ffb15a" emissiveIntensity={glow} />
      </mesh>
      <mesh position={[0, 1.28, 0.15]}>
        <boxGeometry args={[0.24, 0.3, 0.24]} />
        <meshStandardMaterial color="#ffe1b5" emissive="#ff8a2a" emissiveIntensity={glow + 1.2} />
      </mesh>
      <pointLight
        position={[0, 1.15, 0.5]}
        color="#ffb15a"
        intensity={hot ? 9 : 5}
        distance={7}
        decay={2}
      />
    </group>
  );
}

function Screen({ hot }: { hot: boolean }) {
  const glow = hot ? 3.6 : 1.5;
  return (
    <group>
      <mesh position={[0, 0.42, 0]}>
        <boxGeometry args={[0.07, 0.84, 0.07]} />
        <meshStandardMaterial color="#16110c" />
      </mesh>
      <mesh position={[0, 1.02, 0]}>
        <boxGeometry args={[0.72, 0.48, 0.05]} />
        <meshStandardMaterial color="#120e0a" />
      </mesh>
      <mesh position={[0, 1.02, 0.03]}>
        <planeGeometry args={[0.58, 0.34]} />
        <meshStandardMaterial color="#d9fff8" emissive="#7ec8c3" emissiveIntensity={glow} />
      </mesh>
      <mesh position={[0, 1.38, 0]}>
        <octahedronGeometry args={[0.08, 0]} />
        <meshStandardMaterial color="#ffe1b5" emissive="#ffb15a" emissiveIntensity={hot ? 3 : 1.2} />
      </mesh>
      <pointLight position={[0, 1.1, 0.4]} color="#9ee0da" intensity={hot ? 3.2 : 1.2} distance={4} decay={2} />
    </group>
  );
}

function Poster({ hot }: { hot: boolean }) {
  const glow = hot ? 2.8 : 1.15;
  return (
    <group>
      <mesh position={[0, 0.55, 0]}>
        <boxGeometry args={[0.05, 1.1, 0.05]} />
        <meshStandardMaterial color="#24180f" />
      </mesh>
      <mesh position={[0, 1.15, 0]}>
        <boxGeometry args={[0.62, 0.78, 0.04]} />
        <meshStandardMaterial color="#1a140e" />
      </mesh>
      <mesh position={[0, 1.15, 0.03]}>
        <planeGeometry args={[0.48, 0.62]} />
        <meshStandardMaterial color="#ffe1b5" emissive="#ffb15a" emissiveIntensity={glow} />
      </mesh>
    </group>
  );
}

function StandingLantern({ hot }: { hot: boolean }) {
  const glow = hot ? 4 : 2;
  return (
    <group>
      <mesh position={[0, 0.48, 0]}>
        <cylinderGeometry args={[0.03, 0.04, 0.95, 6]} />
        <meshStandardMaterial color="#24180f" />
      </mesh>
      <mesh position={[0, 1.1, 0]}>
        <boxGeometry args={[0.22, 0.28, 0.22]} />
        <meshStandardMaterial color="#ffe1b5" emissive="#ff9a3c" emissiveIntensity={glow} />
      </mesh>
      <mesh position={[0, 1.28, 0]}>
        <boxGeometry args={[0.16, 0.06, 0.16]} />
        <meshStandardMaterial color="#3a2414" />
      </mesh>
      <pointLight position={[0, 1.15, 0.2]} color="#ffb15a" intensity={hot ? 3.4 : 1.6} distance={3.5} decay={2} />
    </group>
  );
}
