"use client";

import React, { useState } from "react";
import { ApodResponseType } from "@/typings/types";
import { getDataFromServer } from "@/components/getDataFromServer";
import { DatePickerWithInput } from "@/components/ui/datePickerWithInput";
import { ApodDisplay } from "./apodDisplay";
import { useEffect } from "react";

const APODForm: React.FC<{}> = () => {
  const [date, setDate] = useState<Date | undefined>(() => new Date());
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

  useEffect(() => {
    onSubmit();
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col items-center gap-8 bg-gray-50 ">
      <div className="w-full max-w-2xl space-y-4">
        <DatePickerWithInput
          title="Select Date"
          value={date}
          onChange={setDate}
          placeholder="Select a date"
        />

        <button
          onClick={onSubmit}
          disabled={loading}
          className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 disabled:bg-gray-400"
        >
          {loading ? "Loading..." : "Fetch APOD"}
        </button>
      </div>

      {data && (
        <div className="w-full max-w-4xl">
          <ApodDisplay data={data} />
        </div>
      )}
    </div>
  );
};

export default APODForm;
