"use client";

import React, { useState } from "react";
import { NormalizedNearEarthObject } from "@/typings/types";
import NeoSizeDisplay from "./neoSizeDisplay";
import { DateRangeForm } from "./dateRangeForm";
import NeoCloseApproachVisualizer from "./neoCloseApproachVisualiser";
// Form to select a date range and fetch NEO's
const NeoForm: React.FC<{}> = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [objects, setObjects] = useState<NormalizedNearEarthObject[]>([]);
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      getDataFromServer();
    } catch (error) {
      console.error("Failed to fetch NEO data:", error);
    } finally {
      setLoading(false);
    }
  };

  async function getDataFromServer(): Promise<void> {
    if (!startDate || !endDate) {
      alert("Please select both a start and end date.");
      return;
    }
    const start = startDate.toISOString().split("T")[0];
    const end = endDate.toISOString().split("T")[0];
    const res = await fetch("api/v1/neo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ startDate: start, endDate: end }),
    });
    
    const data: NormalizedNearEarthObject[] = await res.json();
    setObjects(data || []);
  }

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
      <NeoCloseApproachVisualizer neos={objects} colour="blue"/>
    </div>
  );
};

export default NeoForm;
