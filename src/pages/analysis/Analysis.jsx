import { useState, useEffect } from "react";

import AnalysisHeader from "../../components/analysis/Header";
import DurationSelector from "../../components/analysis/DurationSelector";



const data= {

};

export default function Analysis(){
    const [loading, setLoading] = useState(true);
    const [duration, setDuration] = useState("weekly");
    const [timeRange, setTimeRange] = useState({ start: null, end: null });
    const [analysisData, setAnalysisData] = useState(null);

    return (
    <div className="space-y-8">
        <AnalysisHeader analysisData={data} />
        <DurationSelector duration={duration} setDuration={setDuration} range={timeRange} setRange={setTimeRange} />
    </div>
);
}