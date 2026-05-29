import ResponsiveTable from "./ResponsiveTable.jsx";
import { columns, data } from "./tableData.js";

export default function TableWidgetApp() {
  return (
    <div className="rt-widget">
      <ResponsiveTable columns={columns} data={data} />
    </div>
  );
}
