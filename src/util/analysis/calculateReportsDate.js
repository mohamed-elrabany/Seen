export function getDateRange(type, offset = 0) {
  const now = new Date();
  let start, end;

  if (type === "weekly") {
    const day = now.getDay();
    const diffToMonday = day === 0 ? -6 : 1 - day;

    start = new Date(now);
    start.setDate(now.getDate() + diffToMonday + offset * 7);
    start.setHours(0, 0, 0, 0);

    end = new Date(start);
    end.setDate(start.getDate() + 6);
    end.setHours(23, 59, 59, 999);

  } else if (type === "monthly") {
    start = new Date(now.getFullYear(), now.getMonth() + offset, 1);
    end   = new Date(now.getFullYear(), now.getMonth() + offset + 1, 0);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
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