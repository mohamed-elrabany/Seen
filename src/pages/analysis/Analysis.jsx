import { useState, useEffect } from "react";
import { useMemo } from "react";

import AnalysisHeader from "../../components/analysis/Header";
import DurationSelector from "../../components/analysis/DurationSelector";
import GlucoseStatus from "../../components/analysis/GlucoseStatus";
import Graph from "../../components/analysis/Graph";
import toast from "react-hot-toast";

import { analysisData as data } from "../../util/content";
import { getDateRange } from "../../util/analysis/calculateReportsDate";
import { generatePDF } from "../../services/analysisServices";

export default function Analysis() {
  const [loading, setLoading] = useState(true);
  const [duration, setDuration] = useState("weekly");
  const [customRange, setCustomRange] = useState({ start: null, end: null });
  const [analysisData, setAnalysisData] = useState(data);

  // Single source of truth for dates
  const { start_date, end_date } = useMemo(() => {
    if (duration === "custom") {
      return { start_date: customRange.start, end_date: customRange.end };
    }
    return getDateRange(duration); // handles weekly & monthly
  }, [duration, customRange]);

  function handleGenerateReport() {
    if (duration === "custom" && (!start_date || !end_date)) {
      toast.error("Please select both start and end dates.");
      return;
    }

    toast.promise(
      generatePDF(start_date, end_date),
      {
        loading: "Generating report...",
        success: "Report generated successfully!",
        error: "Failed to generate report. Please try again.",
      },
      {
        loading: { duration: Infinity },
        success: { duration: 5000 },
        error: { duration: 5000 },
      },
    );
  }

  return (
    <div className="space-y-8 p-4 lg:p-8 pt-40 lg:pt-8">
      <AnalysisHeader
        analysisData={data}
        generateReport={handleGenerateReport}
      />
      <DurationSelector
        duration={duration}
        setDuration={setDuration}
        range={customRange}
        setRange={setCustomRange}
      />
      <GlucoseStatus analysisData={analysisData} />
      <Graph readings={analysisData.glucoseReadings} />
    </div>
  );
}
