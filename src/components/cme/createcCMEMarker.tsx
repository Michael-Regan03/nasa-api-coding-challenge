import { VectorGenerator } from "./vectorGenerator";
import * as THREE from "three";

export const createCMEMarker = (lat: number, long: number, radius: number) => {
  const position = VectorGenerator(lat, long, radius + 0.5);

  const size = radius * 0.03;

  const geometry = new THREE.SphereGeometry(size, 16, 16);
  const material = new THREE.MeshBasicMaterial({
    color: new THREE.Color(0, 0, 1), // Blue color (oposite of orange on colour wheel)
    transparent: true,
    opacity: 0.8,
  });

  const marker = new THREE.Mesh(geometry, material);
  marker.position.copy(position);

  return {
    mesh: marker,
  };
};
