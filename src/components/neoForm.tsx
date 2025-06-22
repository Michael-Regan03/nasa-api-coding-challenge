"use client";

import React, { useState } from "react";
import { NormalizedNearEarthObject } from "@/typings/types";
import NeoSizeDisplay from "./neoSizeDisplay";
import { DateRangeForm } from "./dateRangeForm";
import NeoCloseApproachVisualizer from "./neoCloseApproachVisualiser";
import { getDataFromServer } from "@/components/getDataFromServer";

const NeoForm: React.FC<{}> = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [objects, setObjects] = useState<NormalizedNearEarthObject[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (!startDate || !endDate) {
        alert("Please select both a start and end date.");
        return;
      }
      const data: NormalizedNearEarthObject[] = await getDataFromServer({
        endpoint: "neo",
        method: "POST",
        params: { startDate: startDate, endDate: endDate },
      });
      setObjects(data || []);
    } catch (error) {
      console.error("Failed to fetch NEO data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <DateRangeForm
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSubmit={onSubmit}
        loading={loading}
      />
      <NeoSizeDisplay objects={objects} />
      <NeoCloseApproachVisualizer neos={objects} colour="blue" />
    </div>
  );
};

export default NeoForm;
