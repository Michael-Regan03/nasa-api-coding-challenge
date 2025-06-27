import React from "react";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataFromServer } from "@/components/getDataFromServer";
import NeoCloseApproachVisualizer from "@/components/neo/neoCloseApproachVisualiser";
import { NearEarthObject } from "@/typings/types";

export function NeoIDPage(): React.JSX.Element {
  const params = useParams<{ id: string }>();
  const [neo, setNeo] = useState<NearEarthObject[] | []>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (params.id) {
      getDataFromServer({
        endpoint: `neo/${params.id}`,
        method: "GET",
      }).then((data) => {
        setNeo([data]);
        setLoading(false);
      });
    }
  }, [params.id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-center mb-8 p mt-4">
        Near Earth Object: {neo[0]?.name}
      </h1>
      <p>Absolute Magnitude: {neo[0]?.absolute_magnitude_h}</p>
      <p>
        Estimated Minimum Diameter:{" "}
        {neo[0]?.estimated_diameter.kilometers.estimated_diameter_min}km
      </p>
      <p>
        Estimated Maximum Diameter:{" "}
        {neo[0]?.estimated_diameter.kilometers.estimated_diameter_max}km
      </p>

      <NeoCloseApproachVisualizer neos={neo} flag={true} />
    </div>
  );
}

export default NeoIDPage;
