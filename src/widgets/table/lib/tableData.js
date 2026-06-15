const snakeToTitle = (str) =>
  str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");

export const data = [
  {
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    p_title: "AAS Technology (Applied Engineering)",
    updated_date: "05/29/2026",
    years_to_grad: "N/A",
    Final_Hours: "N/A",
    Final_GPA: "N/A",
    degrees: 2,
  },
  {
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    p_title: "AAS Technology (Computer Electronics)",
    years_to_grad: 3.12820512821,
    Final_Hours: 131.923076923,
    updated_date: "05/29/2026",
    Final_GPA: 3.47593153119,
    degrees: 13,
  },
  {
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    p_title: "AAS Technology (No Concentration)",
    updated_date: "05/29/2026",
    years_to_grad: "N/A",
    Final_Hours: "N/A",
    Final_GPA: "N/A",
    degrees: 1,
  },
  {
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    p_title: "BS Cyber Systems Technology (Network Security & Electronics)",
    years_to_grad: 3.24561403509,
    Final_Hours: 138.421052632,
    updated_date: "05/29/2026",
    Final_GPA: 3.40438519062,
    degrees: 19,
  },
  {
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    p_title: "BS Cyber Systems Technology (Tech Systems)",
    updated_date: "05/29/2026",
    years_to_grad: "N/A",
    Final_Hours: "N/A",
    Final_GPA: "N/A",
    degrees: 1,
  },
  {
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    p_title: "BS Engineering Technology Management (Manufacturing)",
    years_to_grad: 3.66666666667,
    updated_date: "05/29/2026",
    Final_GPA: 3.29710824535,
    Final_Hours: 125.8,
    degrees: 5,
  },
  {
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    p_title: "BS Engineering Technology Management (Technology)",
    updated_date: "05/29/2026",
    years_to_grad: "N/A",
    Final_Hours: "N/A",
    Final_GPA: "N/A",
    degrees: 1,
  },
  {
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    p_title: "AAS Technology (Computer Aided Drafting)",
    updated_date: "05/29/2026",
    years_to_grad: null,
    Final_Hours: null,
    Final_GPA: null,
    degrees: 0,
  },
  {
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    p_title: "AAS Technology (Quality Assurance)",
    updated_date: "05/29/2026",
    years_to_grad: null,
    Final_Hours: null,
    Final_GPA: null,
    degrees: 0,
  },
  {
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    p_title: "BS Cyber Systems Technology (No Concentration)",
    updated_date: "05/29/2026",
    years_to_grad: null,
    Final_Hours: null,
    Final_GPA: null,
    degrees: 0,
  },
  {
    time_frame:
      "Degrees awarded during year 2024 - 2025 (summer, fall, winter, spring).",
    p_title: "BS Engineering Technology Management (No Concentration)",
    updated_date: "05/29/2026",
    years_to_grad: null,
    Final_Hours: null,
    Final_GPA: null,
    degrees: 0,
  },
];

export const columns = Object.keys(data[0]).map((key) => ({
  label: snakeToTitle(key),
  key,
}));
