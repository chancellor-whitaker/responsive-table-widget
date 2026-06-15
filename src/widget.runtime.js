// src/widget.runtime.js

import { widgetMeta } from "./widget.meta";
import widget from "./widgets/example";

export const widgetRuntime = {
  ...widgetMeta,
  ...widget,
};
