import { createCMEMarker } from "../../../components/cme/createCMEMarker";
import * as THREE from "three";

// Mock THREE.js
jest.mock("three", () => {
  const actualThree = jest.requireActual("three");
  return {
    ...actualThree,
    SphereGeometry: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
    MeshBasicMaterial: jest.fn().mockImplementation(() => ({
      dispose: jest.fn(),
    })),
    Color: jest.fn(),
    Mesh: jest.fn().mockImplementation(() => ({
      position: new actualThree.Vector3(),
    })),
  };
});

// Mock VectorGenerator
jest.mock("../../../components/cme/vectorGenerator", () => ({
  VectorGenerator: jest.fn(() => new THREE.Vector3(1, 2, 3)),
}));

describe("createCMEMarker", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a marker with correct position", () => {
    const lat = 10;
    const long = 20;
    const radius = 100;

    const result = createCMEMarker(lat, long, radius);

    const {
      VectorGenerator,
    } = require("../../../components/cme/vectorGenerator");
    expect(VectorGenerator).toHaveBeenCalledWith(lat, long, radius + 0.5);

    expect(result.mesh.position).toEqual(new THREE.Vector3(1, 2, 3));
  });

  it("should create a sphere with correct size", () => {
    const radius = 100;
    const expectedSize = radius * 0.03;

    createCMEMarker(0, 0, radius);

    expect(THREE.SphereGeometry).toHaveBeenCalledWith(expectedSize, 16, 16);
  });

  it("should create material with correct properties", () => {
    createCMEMarker(0, 0, 100);

    expect(THREE.MeshBasicMaterial).toHaveBeenCalledWith({
      color: expect.any(THREE.Color),
      transparent: true,
      opacity: 0.8,
    });

    expect(THREE.Color).toHaveBeenCalledWith(0, 0, 1);
  });

  it("should return an object with the mesh", () => {
    const result = createCMEMarker(0, 0, 100);

    expect(result).toHaveProperty("mesh");
    expect(THREE.Mesh).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(Object)
    );
  });

  it("should handle different radius values correctly", () => {
    const testCases = [
      { radius: 50, expectedSize: 1.5 },
      { radius: 200, expectedSize: 6 },
      { radius: 0, expectedSize: 0 },
    ];

    testCases.forEach(({ radius, expectedSize }) => {
      jest.clearAllMocks();
      createCMEMarker(0, 0, radius);
      expect(THREE.SphereGeometry).toHaveBeenCalledWith(expectedSize, 16, 16);
    });
  });
});
