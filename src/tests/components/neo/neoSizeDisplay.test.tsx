import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import NeoSizeDisplay from "../../../components/neo/neoSizeDisplay";
import { mockNormalisedNearEarthObjects } from "../../../tests/mocks/mockNearEarthObjects";

// Mock  react-router-dom
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("NeoSizeDisplay", () => {
  it("renders 'No asteroids to display.' when objects array is empty", () => {
    render(<NeoSizeDisplay objects={[]} />);
    expect(screen.getByText(/no asteroids to display/i)).toBeInTheDocument();
  });
});

test("renders asteroid images for each object", () => {
  render(<NeoSizeDisplay objects={mockNormalisedNearEarthObjects} />);

  const images = screen.getAllByRole("img");
  expect(images).toHaveLength(2);
  expect(images[0]).toHaveAttribute(
    "alt",
    mockNormalisedNearEarthObjects[0].name
  );
  expect(images[1]).toHaveAttribute(
    "alt",
    mockNormalisedNearEarthObjects[1].name
  );
});
