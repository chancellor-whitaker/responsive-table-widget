import { useEffect, useState } from "react";
import ResponsiveTable from "./ResponsiveTable.jsx";
import { columns as defaultColumns, data as defaultRows } from "./tableData.js";

export default function TableWidgetApp({ dataUrl, transformData }) {
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

  if (loading) {
    return <div className="rt-widget">Loading table...</div>;
  }

  if (error) {
    return <div className="rt-widget">Unable to load table data.</div>;
  }

  return (
    <div className="rt-widget">
      <ResponsiveTable columns={columns} data={rows} />
    </div>
  );
}
