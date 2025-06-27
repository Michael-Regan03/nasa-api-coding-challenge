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
    <div>
      <h1>{neo[0]?.name}</h1>
      <NeoCloseApproachVisualizer neos={neo} flag={true} />
    </div>
  );
}

export default NeoIDPage;
