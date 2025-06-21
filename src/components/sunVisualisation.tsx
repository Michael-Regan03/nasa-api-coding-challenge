"use client";
import React, { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createCMEMarker } from "@/components/cme/createcCMEMarker";
import { CoronalMassEjectionAnalysis } from "@/typings/types";

interface SunVisualisationProps {
  onLoaded?: () => void;
  onProgress?: (progress: number) => void;
  cmes?: CoronalMassEjectionAnalysis[];
}

export const SunVisualisation: React.FC<SunVisualisationProps> = ({
  onLoaded,
  onProgress,
  cmes = [],
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const cmeMarkersRef = useRef<ReturnType<typeof createCMEMarker>[]>([]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const initializedRef = useRef(false);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const modelRef = useRef<THREE.Group | THREE.Object3D | undefined>(undefined);

  useEffect(() => {
    if (!mountRef.current || initializedRef.current) return;
    initializedRef.current = true;

    sceneRef.current = new THREE.Scene();
    const scene = sceneRef.current;

    // Camera aspect ration is set of widow size ,  🐛 prevents model distorion
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
    });

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(width, height);

    // Clear any existing canvas , 🐛 prevents double canvas bug
    while (mountRef.current.firstChild) {
      mountRef.current.removeChild(mountRef.current.firstChild);
    }

    mountRef.current.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.25;
    controls.enableZoom = false;
    controls.target.set(0, 0, 0);
    controls.update();

    const gltfLoader = new GLTFLoader();
    let model: THREE.Group | THREE.Object3D | undefined;

    const loadModel = async () => {
      try {
        const sunGLB = await gltfLoader.loadAsync("models/sun.glb");
        model = sunGLB.scene;
        modelRef.current = model;
        scene.add(model);
        setLoading(false);
        setProgress(100);
        onProgress?.(100);
        onLoaded?.();
      } catch (error) {
        console.error("Error loading GLB model:", error);
        setLoading(false);
      }
    };

    loadModel();

    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      if (model) model.rotation.y += 0.001;
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;

      // Update camera aspect ratio to match new window dimensions
      camera.aspect =
        mountRef.current.clientWidth / mountRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(
        mountRef.current.clientWidth,
        mountRef.current.clientHeight
      );
    };

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (mountRef.current?.contains(renderer.domElement)) {
        mountRef.current.removeChild(renderer.domElement);
      }

      renderer.dispose();
      controls.dispose();

      if (modelRef.current) {
        scene.remove(modelRef.current);
        modelRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((m) => m.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
      }

      initializedRef.current = false;
    };
  }, []);

  // Add CME markers to the surface of the sun
  useEffect(() => {
    const updateCMEMarkers = (cmePoints: CoronalMassEjectionAnalysis[]) => {
      // Clear existing markers
      cmeMarkersRef.current.forEach((marker) => {
        modelRef.current?.remove(marker.mesh);
      });
      cmeMarkersRef.current = [];
      if (!modelRef.current || !sceneRef.current) return;

      // Calculate sun radius
      const sunRadius = modelRef.current.scale.x * 1;
      // Add new markers
      cmePoints.forEach((point) => {
        const marker = createCMEMarker(
          point.latitude,
          point.longitude,
          sunRadius
        );
        modelRef.current!.add(marker.mesh);
        cmeMarkersRef.current.push(marker);
      });
    };

    if (cmes.length > 0) {
      updateCMEMarkers(cmes);
    }
  }, [cmes]);

  return (
    <div className="relative w-full bg-black">
      <div
        ref={mountRef}
        className="mx-auto w-full max-w-[100vw] aspect-square"
      />
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-10">
          <div className="text-center text-white">
            <div className="text-lg mb-2">Loading Sun Model...</div>
            <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-yellow-500 transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-sm">{Math.round(progress)}%</div>
          </div>
        </div>
      )}
    </div>
  );
};
