import { useState, useEffect } from "react";

import AnalysisHeader from "../../components/analysis/Header";
import DurationSelector from "../../components/analysis/DurationSelector";
import GlucoseStatus from "../../components/analysis/GlucoseStatus";
import Graph from "../../components/analysis/Graph";

import {analysisData as data} from "../../util/content";

export default function Analysis(){
    const [loading, setLoading] = useState(true);
    const [duration, setDuration] = useState("weekly");
    const [timeRange, setTimeRange] = useState({ start: null, end: null });
    const [analysisData, setAnalysisData] = useState(data);

    return (
    <div className="space-y-8">
        <AnalysisHeader analysisData={data} />
        <DurationSelector duration={duration} setDuration={setDuration} range={timeRange} setRange={setTimeRange} />
        <GlucoseStatus analysisData={analysisData} />
        <Graph readings={analysisData.glucoseReadings} />
    </div>
);
}