import {
  getAverageKmDiameter,
  normalizeAsteroidSizes,
} from "../../../services/neo/normalizeAsteroidSize";

import { mockNearEarthObjects } from "../../../tests/mocks/mockNearEarthObjects";

describe("getAverageKmDiameter", () => {
  it("calculate the average diameter", () => {
    const result = getAverageKmDiameter(mockNearEarthObjects[0]);
    expect(result).toBeCloseTo(0.35119038475);
  });
});

describe("normalizeAsteroidSizes", () => {
  it("add average_km_diameter and diameter_percent_of_max to each object", () => {
    const normalized = normalizeAsteroidSizes(mockNearEarthObjects);

    expect(normalized).toHaveLength(2);

    const first = normalized[0];
    const second = normalized[1];

    expect(first.average_km_diameter).toBeCloseTo(0.35119038475);
    expect(second.average_km_diameter).toBeCloseTo(0.23202918625);

    expect(first.diameter_percent_of_max).toBeCloseTo(100);
    expect(second.diameter_percent_of_max).toBeCloseTo(
      (0.23202918625 / 0.35119038475) * 100
    );
  });
});
