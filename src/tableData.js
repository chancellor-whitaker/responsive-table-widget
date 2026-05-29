const snakeToTitle = (str) =>
  str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export const data = [
  {
    Final_GPA: "N/A",
    Final_Hours: "N/A",
    degrees: 2,
    p_title: "AAS Technology (Applied Engineering)",
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    updated_date: "05/29/2026",
    years_to_grad: "N/A",
  },
  {
    Final_GPA: 3.47593153119,
    Final_Hours: 131.923076923,
    degrees: 13,
    p_title: "AAS Technology (Computer Electronics)",
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    updated_date: "05/29/2026",
    years_to_grad: 3.12820512821,
  },
  {
    Final_GPA: "N/A",
    Final_Hours: "N/A",
    degrees: 1,
    p_title: "AAS Technology (No Concentration)",
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    updated_date: "05/29/2026",
    years_to_grad: "N/A",
  },
  {
    Final_GPA: 3.40438519062,
    Final_Hours: 138.421052632,
    degrees: 19,
    p_title: "BS Cyber Systems Technology (Network Security & Electronics)",
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    updated_date: "05/29/2026",
    years_to_grad: 3.24561403509,
  },
  {
    Final_GPA: "N/A",
    Final_Hours: "N/A",
    degrees: 1,
    p_title: "BS Cyber Systems Technology (Tech Systems)",
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    updated_date: "05/29/2026",
    years_to_grad: "N/A",
  },
  {
    Final_GPA: 3.29710824535,
    Final_Hours: 125.8,
    degrees: 5,
    p_title: "BS Engineering Technology Management (Manufacturing)",
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    updated_date: "05/29/2026",
    years_to_grad: 3.66666666667,
  },
  {
    Final_GPA: "N/A",
    Final_Hours: "N/A",
    degrees: 1,
    p_title: "BS Engineering Technology Management (Technology)",
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    updated_date: "05/29/2026",
    years_to_grad: "N/A",
  },
  {
    Final_GPA: null,
    Final_Hours: null,
    degrees: 0,
    p_title: "AAS Technology (Computer Aided Drafting)",
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    updated_date: "05/29/2026",
    years_to_grad: null,
  },
  {
    Final_GPA: null,
    Final_Hours: null,
    degrees: 0,
    p_title: "AAS Technology (Quality Assurance)",
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    updated_date: "05/29/2026",
    years_to_grad: null,
  },
  {
    Final_GPA: null,
    Final_Hours: null,
    degrees: 0,
    p_title: "BS Cyber Systems Technology (No Concentration)",
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    updated_date: "05/29/2026",
    years_to_grad: null,
  },
  {
    Final_GPA: null,
    Final_Hours: null,
    degrees: 0,
    p_title: "BS Engineering Technology Management (No Concentration)",
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    updated_date: "05/29/2026",
    years_to_grad: null,
  },
];

export const columns = Object.keys(data[0]).map((key) => ({
  key,
  label: snakeToTitle(key),
}));
