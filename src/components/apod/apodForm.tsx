"use client";

import React, { useState } from "react";
import { ApodResponseType } from "@/typings/types";
import { getDataFromServer } from "@/components/getDataFromServer";
import { DatePickerWithInput } from "@/components/ui/datePickerWithInput";
import { ApodDisplay } from "./apodDisplay";

const APODForm: React.FC<{}> = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [data, setData] = useState<ApodResponseType>();
  const [loading, setLoading] = useState(false);
  const onSubmit = async () => {
    setLoading(true);
    try {
      if (!date) {
        alert("Please select both a start and end date.");
        return;
      }
      const data: ApodResponseType = await getDataFromServer({
        endpoint: "apod",
        method: "GET",
        params: { date: date },
      });
      setData(data);
    } catch (error) {
      console.error("Failed to fetch NEO data:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <DatePickerWithInput
        title="Select Date"
        value={date}
        onChange={setDate}
        placeholder="Select a date"
      />
      <button
        onClick={onSubmit}
        disabled={loading}
        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
      >
        {loading ? "Loading..." : "Fetch APOD"}
      </button>
      <div className="border rounded-lg overflow-hidden"></div>
      {data && <ApodDisplay data={data} />}
    </div>
  );
};

export default APODForm;
