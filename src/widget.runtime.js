// src/widget.runtime.js

import widget from "./widgets/accreditation";
import { widgetMeta } from "./widget.meta";

export const widgetRuntime = {
  ...widgetMeta,
  ...widget,
};
