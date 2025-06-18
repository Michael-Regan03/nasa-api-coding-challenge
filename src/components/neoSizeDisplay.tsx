"use client";

import React from "react";
import { NormalizedNearEarthObject } from "@/typings/types";

type NeoSizeDisplayProps = {
  objects: NormalizedNearEarthObject[];
  maxDisplaySize?: number;
};

// Display images representing NEOs with sizes based on their average diameters
const NeoSizeDisplay: React.FC<NeoSizeDisplayProps> = ({
  objects,
  maxDisplaySize = 100,
}) => {
  if (objects.length === 0) return <p>No asteroids to display.</p>;

  return (
    <div className="flex gap-4 flex-wrap items-center">
      {objects.map((obj, index) => {
        const pixelSize = (obj.diameter_percent_of_max / 100) * maxDisplaySize;

        return (
          <div
            key={obj.id || index}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: pixelSize,
            }}
          >
            <img
              key={obj.id || index}
              src={"/images/asteroid.png"}
              alt={obj.name}
              width={pixelSize}
              height={pixelSize}
              title={obj.name}
              style={{
                objectFit: "contain",
                display: "block",
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default NeoSizeDisplay;
