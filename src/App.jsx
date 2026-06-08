// import Component from "./widgets/example";

import useData from "./hooks/useData";
import Widget from "./widgets/example/Widget";

const keyToLabel = { kpi: "Student Performance Indicator" };

const getColumns = (rows) => {
  return Object.keys(rows.length > 0 ? rows[0] : {}).map((key) => ({
    key,
    label: key in keyToLabel ? keyToLabel[key] : key,
  }));
};

export default function App() {
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

  const columns = getColumns(tableRows);

  const valueFormatter = ({ value, row, column }) => {
    const metric = isFlipped ? row.kpi : column.key;

    const str = metric.split("→")[metric.split("→").length - 1];

    if (
      typeof value === "number" &&
      ["final_gpa", "final_hours", "years_to_grad"].includes(str.toLowerCase())
    ) {
      return +value.toFixed(2);
    }
    return value;
  };

  const tableAccessor = ({ data, columns }) => {
    if (!isFlipped) {
      return {
        data,
        columns: columns.filter((key) => {
          const str = key.split("→")[key.split("→").length - 1];
          return !["time_frame", "updated_date"].includes(str.toLowerCase());
        }),
      };
    }

    return {
      columns,
      data: data.filter(({ kpi }) => {
        const str = kpi.split("→")[kpi.split("→").length - 1];
        return !["time_frame", "updated_date"].includes(str.toLowerCase());
      }),
    };
  };

  console.log("data", data);

  // console.log("metrics", metrics);

  // console.log("programs", programs);

  // const valueFormatter=({value,row,column})=>

  /*
    {
        as_of_date: '29MAY2026',
        gr_per_cred_charge: 607,
        ug_max_charge: 5220,
        ug_per_cred_charge: 435,
        updated_date: '05/29/2026',
        website: 'https://www.eku.edu/tuition-and-aid/',
        year: '2526'
      }
    */

  // ug max charge

  const formatterUSD = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <>
      <Widget
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
                Tuition expenses for program completion (AY 20
                {(typeof tuitionData.year === "string"
                  ? tuitionData.year
                  : ""
                ).substring(0, 2)}
                –20
                {(typeof tuitionData.year === "string"
                  ? tuitionData.year
                  : ""
                ).substring(2)}
                ):
              </strong>
              &nbsp;120 credit hours at the current tuition rate of{" "}
              {formatterUSD.format(tuitionData.ug_per_cred_charge)} per hour
              equals {formatterUSD.format(tuitionData.ug_max_charge * 8)}.{" "}
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
          </ul>
        }
      ></Widget>
    </>
  );
}
