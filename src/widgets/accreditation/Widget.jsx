/* src/widgets/accreditation/Widget.jsx */

import { useEffect, useState, Fragment } from "react";

import countDecimalPlaces from "./lib/helpers/countDecimalPlaces";
// import "./widget.css";
import useReorderableItems from "../../hooks/useReorderableItems";
import formatterPercent from "./lib/helpers/formatterPercent";
import formatterUSD from "./lib/helpers/formatterUSD";
import kpiDescriptions from "./lib/kpiDescriptions";
import defaultOptions from "./lib/defaultOptions";
import getColumns from "./lib/helpers/getColumns";
// import applyOrder from "./lib/helpers/applyOrder";
import century from "./lib/helpers/century";
import keyToLabel from "./lib/keyToLabel";

const applyOrder = (items, order = [], getId) => {
  const idFn = typeof getId === "function" ? getId : (item) => item[getId];

  const orderMap = new Map(order.map((id, index) => [id, index]));

  return [...items].sort((a, b) => {
    const aIndex = orderMap.has(idFn(a)) ? orderMap.get(idFn(a)) : Infinity;
    const bIndex = orderMap.has(idFn(b)) ? orderMap.get(idFn(b)) : Infinity;

    return aIndex - bIndex;
  });
};

export default function Widget({
  primaryColor = defaultOptions.primaryColor,
  stickyHeader = defaultOptions.stickyHeader,
  columnOrder = defaultOptions.columnOrder,
  stripedRows = defaultOptions.stripedRows,
  fontFamily = defaultOptions.fontFamily,
  notesMode = defaultOptions.notesMode,
  linkColor = defaultOptions.linkColor,
  hoverRows = defaultOptions.hoverRows,
  showNotes = defaultOptions.showNotes,
  maxHeight = defaultOptions.maxHeight,
  refreshMs = defaultOptions.refreshMs,
  transpose = defaultOptions.transpose,
  rowOrder = defaultOptions.rowOrder,
  dataUrl = defaultOptions.dataUrl,
  compact = defaultOptions.compact,
  theme = defaultOptions.theme,
  title = defaultOptions.title,
  editable = false,
  onOrderChange,
}) {
  const widgetClassName = [
    "example-widget",
    `example-widget--${theme}`,
    compact ? "example-widget--compact" : "",
    stripedRows ? "example-widget--striped" : "",
    hoverRows ? "example-widget--hover" : "",
    stickyHeader ? "example-widget--sticky-header" : "",
    maxHeight ? "example-widget--scrollable" : "",
  ]
    .filter(Boolean)
    .join(" ");

  const widgetStyle = {
    "--example-primary-color": primaryColor,
    "--example-font-family": fontFamily,
    "--example-link-color": linkColor,
    "--example-max-height": maxHeight,
  };

  const response = useData(dataUrl, refreshMs);

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

  const tableRows = transpose ? flippedRowData : rowData;

  const isFlipped = tableRows === flippedRowData;

  const columns = getColumns(tableRows, { ...keyToLabel, ...kpiDescriptions });

  const handlePercentCell = (a, b) => {
    const x = a / b;

    const y = `(${a} / ${b})`;

    return (
      !isNaN(x) && [isNaN(x) ? "N/A" : formatterPercent.format(x), y].join(" ")
    );
  };

  const valueFormatter = ({ column, value, row }) => {
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

  const tableAccessor = ({ columns, data }) => {
    if (!isFlipped) {
      return {
        columns: columns.filter(({ key }) => {
          const str = key.split("→")[key.split("→").length - 1];
          return (
            !["updated_date", "time_frame"].includes(str.toLowerCase()) &&
            !str.includes("program") &&
            !str.includes("cohort")
          );
        }),
        data,
      };
    }

    return {
      data: data.filter(({ kpi }) => {
        const str = kpi.split("→")[kpi.split("→").length - 1];
        return (
          !["updated_date", "time_frame"].includes(str.toLowerCase()) &&
          !str.includes("program") &&
          !str.includes("cohort")
        );
      }),
      columns,
    };
  };

  const notesContent = (
    <>
      <li>
        <strong>N/A =</strong> Fewer than five graduates during the reporting
        period
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
        {formatterUSD.format(tuitionData.ug_max_charge)} per semester across 8
        semesters equals {formatterUSD.format(tuitionData.ug_max_charge * 8)}.{" "}
        <a href={tuitionData.website}>
          See Undergraduate Cost of Attendance page
        </a>
        &nbsp;for details.
      </li>
      <li>
        <strong>Availability of awards and scholarships:</strong>
        &nbsp;Information about all scholarships and applications is available
        on the{" "}
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
    </>
  );

  return (
    <div className={widgetClassName} style={widgetStyle}>
      <Table
        below={
          showNotes && notesMode !== "hidden" ? (
            notesMode === "collapsed" ? (
              <details>
                <summary>Notes</summary>
                <ul>{notesContent}</ul>
              </details>
            ) : (
              <ul>{notesContent}</ul>
            )
          ) : null
        }
        valueFormatter={valueFormatter}
        tableAccessor={tableAccessor}
        onOrderChange={onOrderChange}
        columnOrder={columnOrder}
        transpose={transpose}
        rowOrder={rowOrder}
        editable={editable}
        columns={columns}
        data={tableRows}
        title={title}
      ></Table>
    </div>
  );
}

function Table({
  below = (
    <ul>
      <li>
        <strong>N/A =</strong> Fewer than five graduates during the reporting
        period
      </li>
      <li>
        <strong>Tuition expenses for program completion (AY 2025–2026):</strong>
        &nbsp;120 credit hours at the current tuition rate of $201.90 per hour
        equals $24,228.{" "}
        <a href="https://www.wsc.edu/cost/cost-of-attendance">
          See Undergraduate Cost of Attendance page
        </a>
        &nbsp;for details.
      </li>
      <li>
        <strong>Availability of awards and scholarships:</strong>
        &nbsp;Information about all scholarships and applications is available
        on the{" "}
        <a href="https://www.wsc.edu/scholarships">
          Wayne State College Scholarships page
        </a>
        .
      </li>
    </ul>
  ),
  valueFormatter = ({ value }) => value,
  tableAccessor = (obj) => obj,
  transpose = false,
  columnOrder = [],
  editable = false,
  columns: cols,
  rowOrder = [],
  onOrderChange,
  title = "",
  data: rows,
}) {
  const { columns, data } = tableAccessor({ columns: cols, data: rows });

  const getRowId = (row) => (transpose ? row.kpi : row.p_title);

  const orderedColumns = applyOrder(columns, columnOrder, "key");
  const orderedData = applyOrder(data, rowOrder, getRowId);

  const columnDrag = useReorderableItems({
    onOrderChange: (columnOrder) => {
      onOrderChange?.({ columnOrder });
    },
    getId: (column) => column.key,
    items: orderedColumns,
    enabled: editable,
  });

  const rowDrag = useReorderableItems({
    onOrderChange: (rowOrder) => {
      onOrderChange?.({ rowOrder });
    },
    items: orderedData,
    enabled: editable,
    getId: getRowId,
  });

  const headerRender = orderedColumns.map((column, colIndex) => (
    <th
      {...columnDrag.getDragProps(colIndex)}
      style={{
        cursor: editable ? "grab" : undefined,
        textAlign: "center",
      }}
      key={column.key}
      scope="col"
    >
      {column.label}
    </th>
  ));

  const bodyRender = orderedData.map((row, rowIndex) => (
    <tr
      key={getRowId(row) ?? rowIndex}
      {...rowDrag.getDragProps(rowIndex)}
      style={{
        cursor: editable ? "grab" : undefined,
      }}
    >
      {orderedColumns.map((column, colIndex) => (
        <Fragment key={column.key}>
          {colIndex === 0 ? (
            <td data-label={column.label}>
              <p>
                {valueFormatter({
                  value: row[column.key],
                  column,
                  row,
                })}
              </p>
            </td>
          ) : (
            <td style={{ textAlign: "center" }} data-label={column.label}>
              {valueFormatter({
                value: row[column.key],
                column,
                row,
              })}
            </td>
          )}
        </Fragment>
      ))}
    </tr>
  ));

  return (
    <div className="page-content">
      <div className="editor d-flex flex-column gap-3">
        {title && <h3>{title}</h3>}
        <div
          className="table-wrapper"
          aria-labelledby={86019}
          role="region"
          tabIndex={0}
        >
          <table style={{ width: "100%" }}>
            {/* <caption id={86019}>
              <p style={{ textAlign: "left" }}>
                The following job placement data represents the academic period
                of Dec. 2023 - Aug. 2024, unless otherwise stated.
              </p>
            </caption> */}
            <thead>
              <tr>{headerRender}</tr>
            </thead>
            <tbody>{bodyRender}</tbody>
          </table>
        </div>
        {below && below}
      </div>
    </div>
  );
}

function useData(url, refreshMs = 0) {
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!url) return;

    let ignore = false;

    async function load() {
      const response = await fetch(url);
      const json = await response.json();

      if (!ignore) {
        setData(json);
      }
    }

    load();

    if (!refreshMs) {
      return () => {
        ignore = true;
      };
    }

    const intervalId = setInterval(load, refreshMs);

    return () => {
      ignore = true;
      clearInterval(intervalId);
    };
  }, [url, refreshMs]);

  return data;
}

/*





*/
