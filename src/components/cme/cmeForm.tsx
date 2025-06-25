"use client";

import React, { useState } from "react";
import { DateRangeForm } from "../dateRangeForm";
import { SunVisualisation } from "../cme/sunVisualisation";
import { CoronalMassEjectionAnalysis } from "@/typings/types";
import { getDataFromServer } from "@/components/getDataFromServer";

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
      const data: CoronalMassEjectionAnalysis[] = await getDataFromServer({
        endpoint: "cme",
        method: "POST",
        params: { start_date: startDate, end_date: endDate },
      });
      setCmes(data || []);
    } catch (err) {
      console.error("Failed to fetch CME data:", err);
    } finally {
      setLoading(false);
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
