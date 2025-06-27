import * as THREE from "three";

export function getStarfield(starCount = 10000): THREE.Points {
  const geometry = new THREE.BufferGeometry();
  const material = new THREE.PointsMaterial({
    color: 0xffffff,
    size: 0.1,
  });

  const positions: number[] = [];

  const minDistanceFromCamera = 11; // 🐛 Prevents stars spawning between camera and sun (removes illusion of distance)

  for (let i = 0; i < starCount; i++) {
    // Generate stars in a spherical shell starting at minDistanceFromCamera
    const radius = minDistanceFromCamera + Math.random() * 50; // Stars from 11 to 50 units away

    const theta = Math.random() * Math.PI * 2; // Random angle around Y-axis
    const phi = Math.acos(2 * Math.random() - 1); // Random angle from top to bottom

    // Convert spherical to Cartesian coordinates
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);

    positions.push(x, y, z);
  }

  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  return new THREE.Points(geometry, material);
}
