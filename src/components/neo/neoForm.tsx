"use client";

import React, { useEffect, useState } from "react";
import { NormalizedNearEarthObject } from "@/typings/types";
import NeoSizeDisplay from "./neoSizeDisplay";
import { DateRangeForm } from "../dateRangeForm";
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
        params: { start_date: startDate, end_date: endDate },
      });
      setObjects(data || []);
    } catch (error) {
      console.error("Failed to fetch NEO data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setObjects([]);
  }, []);

  return (
    <div className="min-h-screen py-8 flex flex-col items-center gap-6">
      <DateRangeForm
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSubmit={onSubmit}
        loading={loading}
      />

      <div className="w-full">
        <NeoCloseApproachVisualizer neos={objects} flag={false} />
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-center mb-8 p mt-4">
            Near Earth Objects Size Comparison
          </h1>
          <NeoSizeDisplay objects={objects} />
        </div>
      </div>
    </div>
  );
};

export default NeoForm;
