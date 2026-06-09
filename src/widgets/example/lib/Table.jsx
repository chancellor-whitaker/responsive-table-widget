import { Fragment } from "react";

export default function Table({
  title = "",
  columns: cols,
  data: rows,
  tableAccessor = (obj) => obj,
  valueFormatter = ({ value }) => value,
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
}) {
  const { data, columns } = tableAccessor({ data: rows, columns: cols });

  console.log("table", data, columns);
  return (
    <div className="page-content">
      <div className="editor">
        {title && <h3>{title}</h3>}
        <div
          className="table-wrapper"
          role="region"
          aria-labelledby={86019}
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
              <tr>
                {columns.map((column) => (
                  <th
                    style={{ textAlign: "center" }}
                    key={column.key}
                    scope="col"
                  >
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((column, colIndex) => (
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
                        <td
                          style={{ textAlign: "center" }}
                          data-label={column.label}
                        >
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
              ))}
            </tbody>
          </table>
        </div>
        {below}
        <p>&nbsp;</p>
      </div>
    </div>
  );
}
