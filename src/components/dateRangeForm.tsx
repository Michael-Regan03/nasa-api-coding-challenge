"use client";

import React from "react";
import { DatePickerWithInput } from "@/components/ui/datePickerWithInput";
import { Button } from "./ui/button";

// Form Props
export type DateRangeFormProps = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onSubmit: () => void;
  loading: boolean;
};

// Form defining a date range with start and end dates
export const DateRangeForm: React.FC<DateRangeFormProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
  loading,
}) => {
  return (
    <div className="w-full max-w-2xl space-y-4">
      <DatePickerWithInput
        title="Start Date"
        value={startDate}
        onChange={onStartDateChange}
        placeholder="Select a start date"
      />
      <DatePickerWithInput
        title="End Date"
        value={endDate}
        onChange={onEndDateChange}
        placeholder="Select an end date"
      />
      <Button
        onClick={onSubmit}
        disabled={loading}
        className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Fetch Data"}
      </Button>
    </div>
  );
};
