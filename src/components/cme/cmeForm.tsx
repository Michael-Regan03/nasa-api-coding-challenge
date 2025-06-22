"use client";

import React, { useState } from "react";
import { DateRangeForm } from "../dateRangeForm";
import { SunVisualisation } from "../cme/sunVisualisation";
import { CoronalMassEjectionAnalysis } from "@/typings/types";

const CMEForm: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | undefined>();
  const [endDate, setEndDate] = useState<Date | undefined>();
  const [loading, setLoading] = useState(false);
  const [cmes, setCmes] = useState<CoronalMassEjectionAnalysis[]>([]);

  const onSubmit = async () => {
    if (!startDate || !endDate) {
      return;
    }
    setLoading(true);
    try {
      await getDataFromServer();
    } catch (err) {
      console.error("Failed to fetch CME data:", err);
    } finally {
      setLoading(false);
    }
  };

  const getDataFromServer = async () => {
    const start = startDate!.toISOString().split("T")[0];
    const end = endDate!.toISOString().split("T")[0];

    const res = await fetch("/api/v1/cme", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ startDate: start, endDate: end }),
    });

    if (!res.ok) {
      throw new Error(`HTTP error! status: ${res.status}`);
    }

    const data = await res.json();
    setCmes(data);

    if (!Array.isArray(data)) {
      throw new Error("Invalid data format received");
    }
  };

  return (
    <div className="flex flex-col gap-6 p-4">
      <DateRangeForm
        startDate={startDate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onSubmit={onSubmit}
        loading={loading}
      />
      <div className="border rounded-lg overflow-hidden">
        <SunVisualisation cmes={cmes} />
      </div>
    </div>
  );
};

export default CMEForm;
