import { useEffect, useState } from "react";

export default function IncrementalCounter({ target }) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    // Determine the step size: large enough to finish in ~2 seconds
    const step = Math.ceil(target / 40); 
    
    const interval = setInterval(() => {
      setCurrent((prev) => {
        if (prev + step >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + step;
      });
    }, 50); // Fast interval for smoothness

    return () => clearInterval(interval);
  }, [target]);

  // Format the display: If it's 1,000,000 -> show 1. If it's 50,000 -> show 50.
  const displayValue = target >= 1000000 
    ? (current / 1000000).toFixed(0) 
    : target >= 1000 
      ? (current / 1000).toFixed(0) 
      : current;

  return <span>{displayValue}</span>;
}