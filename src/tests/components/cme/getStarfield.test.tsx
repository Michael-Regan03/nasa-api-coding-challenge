import * as THREE from "three";
import { getStarfield } from "../../../components/cme/getStarfield";

// Partial mock of THREE
jest.mock("three", () => {
  const actualThree = jest.requireActual("three");

  // Mock Points class
  class MockPoints extends actualThree.Points {
    constructor(
      geometry?: THREE.BufferGeometry,
      material?: THREE.PointsMaterial
    ) {
      super(geometry, material);
    }
  }

  return {
    ...actualThree,
    Points: MockPoints,
    BufferGeometry: jest
      .fn()
      .mockImplementation(() => new actualThree.BufferGeometry()),
    PointsMaterial: jest
      .fn()
      .mockImplementation((params) => new actualThree.PointsMaterial(params)),
    Float32BufferAttribute: jest
      .fn()
      .mockImplementation(
        (array, itemSize) =>
          new actualThree.Float32BufferAttribute(array, itemSize)
      ),
  };
});

describe("getStarfield", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should create a Points object", () => {
    const starfield = getStarfield(100);
    expect(starfield).toBeInstanceOf(THREE.Points);
  });

  it("should position stars beyond minimum distance", () => {
    const starCount = 100;
    getStarfield(starCount);

    const float32Calls = (THREE.Float32BufferAttribute as jest.Mock).mock.calls;
    const positions = float32Calls[0][0];

    for (let i = 0; i < positions.length; i += 3) {
      const distance = Math.sqrt(
        positions[i] ** 2 + positions[i + 1] ** 2 + positions[i + 2] ** 2
      );
      expect(distance).toBeGreaterThanOrEqual(11);
      expect(distance).toBeLessThanOrEqual(61);
    }
  });
});
