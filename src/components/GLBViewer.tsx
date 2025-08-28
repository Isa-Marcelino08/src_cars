import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

interface GLBModelProps {
  url: string;
  scale?: number;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
}

function GLBModel({
  url,
  scale = 1,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  autoRotate = true,
}: GLBModelProps) {
  const { scene } = useGLTF(url);
  const meshRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (meshRef.current && autoRotate) {
      meshRef.current.rotation.y += 0.005;
    }
  });

  const clonedScene = scene.clone();

  return (
    <group ref={meshRef} scale={scale} position={position} rotation={rotation}>
      <primitive object={clonedScene} />
    </group>
  );
}

interface GLBViewerProps {
  modelUrl: string;
  backgroundColor?: string;
  width?: string;
  height?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  autoRotate?: boolean;
  enableControls?: boolean;
  showEnviroment?: boolean;
  className?: string;
  scale?: number,

}

const GLBViewer = ({
  modelUrl,
  backgroundColor = "#970700",
  width = " 100%",
  height = " 100%",
  scale = 1,
  rotation = [0, 0, 0],
  position = [0, 0, 0],
  autoRotate = true,
  enableControls = true,
  showEnviroment = true,
  className,
}: GLBViewerProps) => {
  return (
    <div className={className} style={{ width, height }}>
      <Canvas
        camera={{ position: [0, -2, 5], fov: 50, near: 0.1, far: 1000 }}
        gl={{
          antialias: true,
          alpha: false,
          powerPreference: "high-performance",
        }}
      >
        <color attach="background" args={[backgroundColor]} />

        {showEnviroment && <Environment preset="sunset" />}

        {enableControls && (
          <OrbitControls
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
            minDistance={6}
            maxDistance={14}
            autoRotate={false}
          />
        )}

        <Suspense fallback={null}>
          <GLBModel
            url={modelUrl}
            scale={scale}
            position={position}
            rotation={rotation}
            autoRotate={autoRotate}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default GLBViewer;
