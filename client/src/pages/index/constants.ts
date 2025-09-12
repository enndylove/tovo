// Guests stay static (no change)
export const guestOptions = [
  { value: 1, label: "1", sublabel: "guest" },
  { value: 2, label: "2", sublabel: "guests" },
  { value: 3, label: "3", sublabel: "guests" },
  { value: 4, label: "4", sublabel: "guests" },
  { value: 5, label: "5+", sublabel: "guests" },
];

export const generateDates = (days = 7) => {
  const today = new Date();
  return Array.from({ length: days }).map((_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() + i);

    return {
      date: d.getDate().toString(),
      day: d.toLocaleDateString("en-US", { weekday: "short" }).toUpperCase(),
      isToday: i === 0,
      value: d.toISOString().split("T")[0],
    };
  });
};

export const dates = generateDates(7);

// ✅ auto-generate times (every 2 hours from 10:00 to 20:00)
export const generateTimes = (start = 10, end = 20, step = 2) => {
  const times: string[] = [];
  for (let h = start; h <= end; h += step) {
    times.push(`${h.toString().padStart(2, "0")}:00`);
  }
  return times;
};

export const times = generateTimes(10, 20, 2);
