/* src/widgets/table/Widget.jsx */

import { useEffect, useState, useMemo } from "react";

import {
  columns as defaultColumns,
  data as defaultRows,
} from "./lib/tableData.js";
import ResponsiveTable from "./lib/ResponsiveTable.jsx";

export default function Widget({ transformData, dataUrl }) {
  const settings = useMemo(() => getWidgetSettings(), []);

  const [columns, setColumns] = useState(defaultColumns);
  const [rows, setRows] = useState(defaultRows);
  const [loading, setLoading] = useState(Boolean(dataUrl));
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!dataUrl) return;

    let cancelled = false;

    async function loadData() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(dataUrl);

        if (!response.ok) {
          throw new Error(`Request failed: ${response.status}`);
        }

        const rawData = await response.json();

        const result = transformData ? transformData(rawData) : rawData;

        if (cancelled) return;

        setColumns(result.columns ?? defaultColumns);
        setRows(result.rows ?? result.data ?? defaultRows);
      } catch (err) {
        if (!cancelled) {
          setError(err.message);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadData();

    return () => {
      cancelled = true;
    };
  }, [dataUrl, transformData]);

  const widgetClassName = [
    "rt-widget",
    `rt-theme-${settings.theme}`,
    settings.compact ? "rt-compact" : "",
  ]
    .filter(Boolean)
    .join(" ");

  if (loading) {
    return <div className={widgetClassName}>Loading table...</div>;
  }

  if (error) {
    return <div className={widgetClassName}>Unable to load table data.</div>;
  }

  return (
    <div className={widgetClassName}>
      <ResponsiveTable columns={columns} data={rows} />
    </div>
  );
}

function getWidgetSettings() {
  const params = new URLSearchParams(window.location.search);

  const theme = params.get("theme") === "dark" ? "dark" : "light";
  const compact = params.get("compact") === "true";

  return {
    compact,
    theme,
  };
}
