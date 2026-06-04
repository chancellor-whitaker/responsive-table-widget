export default function Widget() {
  return (
    <div className="page-content">
      <div className="editor">
        <h3>Student performance and achievement information</h3>
        <div
          className="table-wrapper"
          role="region"
          aria-labelledby={86019}
          tabIndex={0}
        >
          <table style={{ width: "100%" }}>
            <caption id={86019}>
              <p style={{ textAlign: "left" }}>
                The following job placement data represents the academic period
                of Dec. 2023 - Aug. 2024, unless otherwise stated.
              </p>
            </caption>
            <thead>
              <tr>
                <th scope="col" style={{ textAlign: "center" }}>
                  Student Performance Indicator
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Industrial Technology – Construction Management
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Industrial Technology - Drafting &amp; Design
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Industrial Technology – Manufacturing Management
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Industrial Technology – Safety Management
                </th>
                <th scope="col" style={{ textAlign: "center" }}>
                  Engineering Technology
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>Graduation Rate (% Graduated in 4 years)</p>
                </td>
                <td style={{ textAlign: "center" }}>64%</td>
                <td style={{ textAlign: "center" }}>63%</td>
                <td style={{ textAlign: "center" }}>N/A</td>
                <td style={{ textAlign: "center" }}>N/A</td>
                <td style={{ textAlign: "center" }}>40%</td>
              </tr>
              <tr>
                <td>
                  <p>Retention Rate (Average for 5 years ending 2024)</p>
                </td>
                <td style={{ textAlign: "center" }}>81%</td>
                <td style={{ textAlign: "center" }}>87%</td>
                <td style={{ textAlign: "center" }}>
                  <abbr title="Not available">N/A</abbr>
                </td>
                <td style={{ textAlign: "center" }}>90%</td>
                <td style={{ textAlign: "center" }}>60%</td>
              </tr>
              <tr>
                <td>
                  <p>Mean GPA -Graduating Class (5 years ended May, 2025)</p>
                </td>
                <td style={{ textAlign: "center" }}>3.41</td>
                <td style={{ textAlign: "center" }}>3.56</td>
                <td style={{ textAlign: "center" }}>
                  <abbr title="Not available">N/A</abbr>
                </td>
                <td style={{ textAlign: "center" }}>3.34</td>
                <td style={{ textAlign: "center" }}>3.41</td>
              </tr>
              <tr>
                <td>
                  Average Years to Complete the Degree (most recent cohort)
                </td>
                <td style={{ textAlign: "center" }}>3.75</td>
                <td style={{ textAlign: "center" }}>3.63</td>
                <td style={{ textAlign: "center" }}>
                  <abbr title="Not available">N/A</abbr>
                </td>
                <td style={{ textAlign: "center" }}>4.13</td>
                <td style={{ textAlign: "center" }}>3.92</td>
              </tr>
              <tr>
                <td>Career Placement Rate</td>
                <td style={{ textAlign: "center" }}>100%</td>
                <td style={{ textAlign: "center" }}>100%</td>
                <td style={{ textAlign: "center" }}>
                  <abbr title="Not available">N/A</abbr>
                </td>
                <td style={{ textAlign: "center" }}>100%</td>
                <td style={{ textAlign: "center" }}>100%</td>
              </tr>
            </tbody>
          </table>
        </div>
        <ul>
          <li>
            <strong>N/A =</strong> Fewer than five graduates during the
            reporting period
          </li>
          <li>
            <strong>
              Tuition expenses for program completion (AY 2025–2026):
            </strong>
            &nbsp;120 credit hours at the current tuition rate of $201.90 per
            hour equals $24,228.{" "}
            <a href="https://www.wsc.edu/cost/cost-of-attendance">
              See Undergraduate Cost of Attendance page
            </a>
            &nbsp;for details.
          </li>
          <li>
            <strong>Availability of awards and scholarships:</strong>
            &nbsp;Information about all scholarships and applications is
            available on the{" "}
            <a href="https://www.wsc.edu/scholarships">
              Wayne State College Scholarships page
            </a>
            .
          </li>
        </ul>
        <p>&nbsp;</p>
      </div>
    </div>
  );
}
