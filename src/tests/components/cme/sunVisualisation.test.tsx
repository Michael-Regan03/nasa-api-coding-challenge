import React from "react";
import { render, act } from "@testing-library/react";
import "@testing-library/jest-dom";

// Mock Three.js core functionality
jest.mock("three", () => {
  const actualThree = jest.requireActual("three");
  return {
    ...actualThree,
    Scene: jest.fn(() => ({
      add: jest.fn(),
      remove: jest.fn(),
    })),
    WebGLRenderer: jest.fn(() => ({
      domElement: document.createElement("canvas"),
      setPixelRatio: jest.fn(),
      setSize: jest.fn(),
      render: jest.fn(),
      dispose: jest.fn(),
    })),
    PerspectiveCamera: jest.fn(() => ({
      position: { set: jest.fn() },
      aspect: 0,
      updateProjectionMatrix: jest.fn(),
    })),
    Raycaster: jest.fn(() => ({
      setFromCamera: jest.fn(),
      intersectObjects: jest.fn(),
    })),
    Vector2: jest.fn(),
  };
});

// Mock Orbit Control
const OrbitControlsMock = jest.fn().mockImplementation(function (
  this: any,
  camera: any,
  domElement: any
) {
  this.camera = camera;
  this.domElement = domElement;
  this.enableDamping = true;
  this.dampingFactor = 0.25;
  this.enableZoom = false;
  this.target = { set: jest.fn() };
  this.update = jest.fn();
  this.dispose = jest.fn();
});

jest.mock("three/examples/jsm/controls/OrbitControls", () => ({
  OrbitControls: OrbitControlsMock,
}));

// 3. GLTFLoader mock
jest.mock("three/examples/jsm/loaders/GLTFLoader", () => {
  const mockGLTFLoader = jest.fn().mockImplementation(() => ({
    loadAsync: jest.fn().mockResolvedValue({
      scene: {
        scale: { x: 1 },
        rotation: { y: 0 },
        traverse: jest.fn(),
        add: jest.fn(),
        remove: jest.fn(),
        userData: {},
      },
    }),
  }));
  return {
    __esModule: true,
    default: mockGLTFLoader,
    GLTFLoader: mockGLTFLoader,
  };
});

// 4. Mock createCMEMarker
jest.mock("../../../components/cme/createcCMEMarker", () => ({
  createCMEMarker: jest.fn(() => ({
    mesh: {
      userData: {},
      dispose: jest.fn(),
    },
  })),
}));

import { SunVisualisation } from "../../../components/cme/sunVisualisation";

describe("SunVisualisation", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", async () => {
    let container: HTMLElement;

    await act(async () => {
      const { container: renderedContainer } = render(<SunVisualisation />);
      container = renderedContainer;
    });

    expect(container!).toBeInTheDocument();
    const canvas = container!.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("initializes OrbitControls correctly", async () => {
    await act(async () => {
      render(<SunVisualisation />);
    });

    const {
      OrbitControls,
    } = require("three/examples/jsm/controls/OrbitControls");

    expect(OrbitControls).toHaveBeenCalledWith(
      expect.any(Object),
      expect.any(HTMLElement)
    );
  });
});
