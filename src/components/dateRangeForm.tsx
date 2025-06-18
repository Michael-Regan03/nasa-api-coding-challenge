"use client";

import React from "react";
import { DatePickerWithInput } from "@/components/ui/datePickerWithInput";
import { Button } from "./ui/button";

export type DateRangeFormProps = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  onStartDateChange: (date: Date | undefined) => void;
  onEndDateChange: (date: Date | undefined) => void;
  onSubmit: () => void;
  loading: boolean;
};

export const DateRangeForm: React.FC<DateRangeFormProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onSubmit,
  loading,
}) => {
  return (
    <div className="flex gap-4 flex-wrap items-end">
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
      <Button onClick={onSubmit} disabled={loading}>
        {loading ? "Loading..." : "Fetch"}
      </Button>
    </div>
  );
};
