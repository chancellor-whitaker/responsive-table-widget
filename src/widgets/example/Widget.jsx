// import Component from "./widgets/example";

import useData from "./lib/useData";
import Table from "./lib/Table";

const keyToLabel = { kpi: "Student Performance Indicator", p_title: "Program" };

const today = new Date();
const currentYear = today.getFullYear(); // e.g., 2026
const century = Math.ceil(currentYear / 100);

const getColumns = (rows, labels = {}) => {
  return Object.keys(rows.length > 0 ? rows[0] : {}).map((key) => ({
    key,
    label: key in labels ? labels[key] : key,
  }));
};

function countDecimalPlaces(value) {
  // Return 0 if the value is an integer
  if (Math.floor(value) === value) return 0;

  const str = value.toString();

  // Handle scientific notation (e.g., 1e-7)
  if (str.includes("e-")) {
    return parseInt(str.split("e-")[1], 10);
  }

  // Handle standard decimal numbers
  return str.includes(".") ? str.split(".")[1].length : 0;
}

const formatterUSD = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formatterPercent = new Intl.NumberFormat("default", {
  style: "percent",
});

const kpiDescriptions = {
  "Degrees→Final_GPA": "Mean GPA - Graduating Class",
  "Degrees→Final_Hours": "Mean Hours - Graduating Class",
  "Degrees→degrees": "Degrees Awarded",
  "Degrees→years_to_grad": "Average Years to Complete the Degree",
  "Grad Rates→_6yr_": "6 Year Graduation Rate",
  "Retention Rates→retained": "Retention Rate",
};

export default function Widget({ title }) {
  const response = useData(
    "https://irserver2.eku.edu/Apps/DataPage/PROD/Accreditation/ATMAE/data",
  );

  const data = response ? response : {};

  const tuitionData =
    "Tuition" in data && Array.isArray(data.Tuition) && data.Tuition.length > 0
      ? data.Tuition[0]
      : {};

  const scholarData =
    "Scholarship" in data &&
    Array.isArray(data.Scholarship) &&
    data.Scholarship.length > 0
      ? data.Scholarship[0]
      : {};

  const metrics = Object.entries(data)
    .filter(([, v]) => Array.isArray(v) && v.length > 1)
    .map(([k]) => k)
    .sort();

  const getNotes = () => {
    const entries = Object.entries(data).filter(
      ([, v]) => Array.isArray(v) && v.length > 1,
    );

    return entries.map(([k, v]) => [k, v[0].time_frame]);
  };

  const notes = getNotes();

  // const programs = [
  //   ...new Set(
  //     Object.entries(data)
  //       .filter(([, v]) => Array.isArray(v) && v.length > 1)
  //       .map(([, v]) => v.map(({ p_title }) => p_title))
  //       .flat()
  //       .filter(Boolean),
  //   ),
  // ].sort();

  const getRowData = () => {
    const lookup = {};

    Object.entries(data).forEach(([a, b]) => {
      if (metrics.includes(a)) {
        b.forEach(({ p_title, ...rest }) => {
          const standardized = Object.fromEntries(
            Object.entries(rest).map(([k, v]) => [`${a}→${k}`, v]),
          );

          if (!(p_title in lookup)) lookup[p_title] = { p_title };

          lookup[p_title] = { ...lookup[p_title], ...standardized };
        });
      }
    });

    return Object.values(lookup);
  };

  const rowData = getRowData();

  const flipRowData = () => {
    const kpis = Object.keys(rowData.length > 0 ? rowData[0] : {}).filter(
      (key) => key !== "p_title",
    );

    const lookup = Object.fromEntries(kpis.map((kpi) => [kpi, { kpi }]));

    kpis.forEach((kpi) =>
      rowData.forEach((row) => {
        lookup[kpi][row.p_title] = row[kpi];
      }),
    );

    return Object.values(lookup);
  };

  const flippedRowData = flipRowData();

  const tableRows = flippedRowData;

  const isFlipped = tableRows === flippedRowData;

  const columns = getColumns(tableRows, { ...keyToLabel, ...kpiDescriptions });

  const handlePercentCell = (a, b) => {
    const x = a / b;

    const y = `(${a} / ${b})`;

    return (
      !isNaN(x) && [isNaN(x) ? "N/A" : formatterPercent.format(x), y].join(" ")
    );
  };

  const valueFormatter = ({ value, row, column }) => {
    if (isFlipped && column.key === "kpi") {
      return value in kpiDescriptions ? kpiDescriptions[value] : value;
    }
    if (isFlipped && column.key !== "kpi") {
      if (row.kpi === "Grad Rates→_6yr_") {
        const cohortRow = tableRows.find(
          (el) => el.kpi === "Grad Rates→cohort",
        );

        return handlePercentCell(value, cohortRow[column.key]);
      }

      if (row.kpi === "Retention Rates→retained") {
        const cohortRow = tableRows.find(
          (el) => el.kpi === "Retention Rates→cohort",
        );

        return handlePercentCell(value, cohortRow[column.key]);
      }
    }

    if (!isFlipped && column.key === "Grad Rates→_6yr_") {
      return handlePercentCell(value, row["Grad Rates→cohort"]);
    }

    if (!isFlipped && column.key === "Retention Rates→retained") {
      return handlePercentCell(value, row["Retention Rates→cohort"]);
    }

    // const str = metric.split("→")[metric.split("→").length - 1];

    if (typeof value === "number" && countDecimalPlaces(value) > 2) {
      return +value.toFixed(2);
    }

    return value;
  };

  // only 6yr as rate for grad rates
  // only retained as rate for retention rates
  // come up with own desc if needed
  // use time_frame descriptions as notes

  const tableAccessor = ({ data, columns }) => {
    if (!isFlipped) {
      return {
        data,
        columns: columns.filter(({ key }) => {
          const str = key.split("→")[key.split("→").length - 1];
          return (
            !["time_frame", "updated_date"].includes(str.toLowerCase()) &&
            !str.includes("program") &&
            !str.includes("cohort")
          );
        }),
      };
    }

    return {
      columns,
      data: data.filter(({ kpi }) => {
        const str = kpi.split("→")[kpi.split("→").length - 1];
        return (
          !["time_frame", "updated_date"].includes(str.toLowerCase()) &&
          !str.includes("program") &&
          !str.includes("cohort")
        );
      }),
    };
  };

  console.log("data", data);

  return (
    <>
      <Table
        title={title}
        valueFormatter={valueFormatter}
        data={tableRows}
        columns={columns}
        tableAccessor={tableAccessor}
        below={
          <ul>
            <li>
              <strong>N/A =</strong> Fewer than five graduates during the
              reporting period
            </li>
            <li>
              <strong>
                Tuition expenses for program completion (AY {century - 1}
                {(typeof tuitionData.year === "string"
                  ? tuitionData.year
                  : ""
                ).substring(0, 2)}
                –{century - 1}
                {(typeof tuitionData.year === "string"
                  ? tuitionData.year
                  : ""
                ).substring(2)}
                ):
              </strong>
              &nbsp;120 credit hours at the current tuition rate of{" "}
              {formatterUSD.format(tuitionData.ug_max_charge)} per semester
              across 8 semesters equals{" "}
              {formatterUSD.format(tuitionData.ug_max_charge * 8)}.{" "}
              <a href={tuitionData.website}>
                See Undergraduate Cost of Attendance page
              </a>
              &nbsp;for details.
            </li>
            <li>
              <strong>Availability of awards and scholarships:</strong>
              &nbsp;Information about all scholarships and applications is
              available on the{" "}
              <a href={scholarData.website}>
                Eastern Kentucky University Scholarships page
              </a>
              .
            </li>
            {notes.map(([a, b]) => (
              <li key={a}>
                <strong>{a}:</strong> {b}
              </li>
            ))}
          </ul>
        }
      ></Table>
    </>
  );
}
