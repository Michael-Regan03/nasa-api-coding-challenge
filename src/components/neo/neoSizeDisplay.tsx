"use client";

import React from "react";
import { NormalizedNearEarthObject } from "@/typings/types";
import { useNavigate } from "react-router-dom";

type NeoSizeDisplayProps = {
  objects: NormalizedNearEarthObject[];
  maxDisplaySize?: number;
};

// Display images representing NEOs with sizes based on their average diameters
const NeoSizeDisplay: React.FC<NeoSizeDisplayProps> = ({
  objects,
  maxDisplaySize = 100,
}) => {
  const navigate = useNavigate();
  if (objects.length === 0) return <p>No NEOs to display.</p>;

  return (
    <div className="flex gap-4 flex-wrap items-center border-2 border-gray-300 hover:border-4 hover:border-blue-500 transition-all p-4 rounded-lg">
      {objects.map((obj, index) => {
        const pixelSize = (obj.diameter_percent_of_max / 100) * maxDisplaySize;

        return (
          <div
            key={obj.id || index}
            onClick={() => navigate(`/neo/${obj.id}`)}
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
              title={`
              ${obj.name}
              Diameter: ${obj.estimated_diameter.kilometers.estimated_diameter_min}km - ${obj.estimated_diameter.kilometers.estimated_diameter_max}km`}
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
