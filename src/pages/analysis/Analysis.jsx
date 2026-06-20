import { useState, useEffect } from "react";
import { useMemo } from "react";

import AnalysisHeader from "../../components/analysis/Header";
import DurationSelector from "../../components/analysis/DurationSelector";
import GlucoseStatus from "../../components/analysis/GlucoseStatus";
import Graph from "../../components/analysis/Graph";
import toast from "react-hot-toast";

import { analysisData as data } from "../../util/content";
import { getDateRange } from "../../util/analysis/calculateReportsDate";
import { generatePDF, getAnalysis } from "../../services/analysisServices";

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

useEffect(() => {
    // 1. Guard Clause: Don't fetch if custom range is selected but dates are missing
    if (duration === "custom" && (!start_date || !end_date)) {
      return;
    }

    let isCurrent = true; // Flag to prevent race conditions
    setLoading(true);

    const fetchAnalysis = async () => {
      try {
        console.log("Fetching analysis DATA for:", { start_date, end_date });
        const analysis = await getAnalysis(start_date, end_date);
        
        // 2. Only update state if this request is still the latest one
        if (isCurrent) {
          console.log("Analysis data successfully updated:", analysis);
          setAnalysisData(analysis);
        }
      } catch (error) {
        console.error("Error fetching analysis data:", error);
      } finally {
        if (isCurrent) {
          setLoading(false);
        }
      }
    };

    fetchAnalysis();

    // 3. Cleanup function runs when start_date/end_date changes again
    return () => {
      isCurrent = false;
    };
  }, [start_date, end_date, duration]);


  return (
    <div className={`space-y-8 p-4 lg:p-8 pt-40 lg:pt-8 transition-opacity duration-300 ${loading ? "opacity-50 pointer-events-none" : "opacity-100"}`}>
      <AnalysisHeader
        reportStatistics={analysisData.reportStatistics}
        generateReport={handleGenerateReport}
      />
      <DurationSelector
        duration={duration}
        setDuration={setDuration}
        range={customRange}
        setRange={setCustomRange}
      />
      <GlucoseStatus reportStatistics={analysisData.reportStatistics} />
      <Graph readings={analysisData.glucoseReadings} />
    </div>
  );
}
