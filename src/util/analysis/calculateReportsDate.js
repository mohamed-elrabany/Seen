export function getDateRange(type, offset = 0) {
  const now = new Date();
  let start, end;

  end = new Date(now);
  end.setHours(23, 59, 59, 999);

  if (type === "weekly") {
    start = new Date(now);
    start.setDate(now.getDate() - 6 + offset * 7);
    start.setHours(0, 0, 0, 0);

  } else if (type === "monthly") {
    start = new Date(now);
    start.setDate(now.getDate() - 29 + offset * 30);
    start.setHours(0, 0, 0, 0);

  } else {
    throw new Error(`Unknown range type: "${type}"`);
  }

  return {
    start_date: toISO(start),
    end_date:   toISO(end),
  };
}

function toISO(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}