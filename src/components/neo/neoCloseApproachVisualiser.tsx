import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import { NearEarthObject } from "@/typings/types";
import { useNavigate } from "react-router-dom";

type Props = {
  neos: NearEarthObject[];
  flag?: boolean;
};

const NeoCloseApproachVisualizer: React.FC<Props> = ({ neos, flag }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!svgRef.current) return;

    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove(); // clear on update
    const earthRadius = 30;
    const width = 400;
    const height = 400;
    const center = { x: width / 2, y: height / 2 };
    const minRadius = earthRadius + 5;
    const maxRadius = Math.min(width, height) / 2 - 10;

    // Get max distance from all close approaches from all neos
    const allMissDistances = neos
      .flatMap((neo) =>
        neo.close_approach_data.map(
          (approach) => Number(approach?.miss_distance?.lunar) || 0
        )
      )
      .filter((distance) => !isNaN(distance) && distance > 0);

    const maxDistance = d3.max(allMissDistances) || 1; // Fallback

    const scale = d3
      .scaleLinear()
      .domain([0.001, maxDistance + 1])
      .range([minRadius, maxRadius])
      .clamp(true);

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
      const neoColour = flag
        ? "yellow" //yellow is opposite blue on the colour wheel
        : neo.is_potentially_hazardous_asteroid
          ? "red"
          : "green";

      neo.close_approach_data.forEach((approach, j) => {
        if (!approach) return;

        const missDistance = Number(approach.miss_distance.lunar);
        const angle =
          (i / neos.length + j / neo.close_approach_data.length) * 2 * Math.PI;
        const r = scale(missDistance);
        const x = center.x + r * Math.cos(angle);
        const y = center.y + r * Math.sin(angle);

        let text = neo.name;
        if (flag) {
          text = approach.close_approach_date;
        }

        group
          .append("circle")
          .attr("cx", x)
          .attr("cy", y)
          .attr("r", 5)
          .attr("fill", neoColour)
          .attr("stroke", "white")
          .attr("stroke-width", 1)
          .style("cursor", "pointer")
          .on("click", () => {
            navigate(`/neo/${neo.id}`);
          })
          .append("title")
          .text(
            `${text}\nMiss: ${approach.miss_distance.kilometers.toLocaleString()} km`
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
