import { NearEarthObject, NormalizedNearEarthObject } from "@/typings/types";

// Function to compute the average diameter
export function getAverageKmDiameter(obj: NearEarthObject): number {
  const km = obj.estimated_diameter.kilometers;
  return (km.estimated_diameter_min + km.estimated_diameter_max) / 2;
}

// Function to normalize asteroid sizes
export function normalizeAsteroidSizes(
  objects: NearEarthObject[]
): NormalizedNearEarthObject[] {
  const maxDiameter = Math.max(...objects.map(getAverageKmDiameter)); // Find the maximum average diameter

  return objects.map((obj) => {
    const avgDiameter = getAverageKmDiameter(obj);
    const percentageOfMax = (avgDiameter / maxDiameter) * 100;

    return {
      ...obj,
      average_km_diameter: avgDiameter,
      diameter_percent_of_max: percentageOfMax,
    };
  });
}
