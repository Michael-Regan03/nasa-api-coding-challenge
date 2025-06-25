import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { NormalizedNearEarthObject } from "@/typings/types";

type Props = {
  neos: NormalizedNearEarthObject[];
  colour?: string;
};

const NeoCloseApproachVisualizer: React.FC<Props> = ({ neos, colour }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // clear on update

    const earthRadius = 30;
    const width = 400;
    const height = 400;
    const center = { x: width / 2, y: height / 2 };
    const minRadius = earthRadius + 5;
    const maxRadius = 180;

    const missDistances = neos.map((n) =>
      Number(n.close_approach_data[0]?.miss_distance?.lunar)
    );

    const maxDistance = d3.max(missDistances) || 1; /// Fallback

    const scale = d3
      .scaleLinear()
      .domain([0.001, maxDistance + 1])
      .range([minRadius, maxRadius]);

    const group = svg.append("g");

    // Earth image
    group
      .append("image")
      .attr("href", "/images/earth1.png")
      .attr("x", center.x - earthRadius)
      .attr("y", center.y - earthRadius)
      .attr("width", 60)
      .attr("height", 60);

    // NEOs
    neos.forEach((neo, i) => {
      let neoColour = "green";
      if (!colour) {
        if (neo.is_potentially_hazardous_asteroid) {
          neoColour = "red";
        }
      } else {
        neoColour = neoColour;
      }
      neo.close_approach_data.forEach((approach) => {
        if (!approach) return;

        const missDistance = Number(approach.miss_distance.lunar);
        const angle = (i / neos.length) * 2 * Math.PI;
        const r = scale(missDistance);
        const x = center.x + r * Math.cos(angle);
        const y = center.y + r * Math.sin(angle);

        group
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 5)
          .attr("fill", neoColour)
          .attr("stroke", "white")
          .attr("stroke-width", 1)
          .append("title")
          .text(
            `${neo.name}\nMiss: ${approach.miss_distance.kilometers.toLocaleString()} km`
          );
      });
    });
  }, [neos]);

  return (
    <div className="orbit-container flex flex-col gap-6 bg-[url('/images/space.jpg')] bg-cover bg-center min-h-screen">
      <svg
        ref={svgRef}
        className="w-full h-full"
        viewBox="0 0 400 400"
        preserveAspectRatio="xMidYMid meet"
      />
    </div>
  );
};

export default NeoCloseApproachVisualizer;
