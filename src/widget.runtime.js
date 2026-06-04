import Component from "./widgets/example";

import { widgetMeta } from "./widget.meta";

export const widgetRuntime = {
  ...widgetMeta,
  component: Component,
};
