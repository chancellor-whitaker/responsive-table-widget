/* src/widgets/example/index.js */

import bootstrapCss from "bootstrap/dist/css/bootstrap.min.css?inline";

import widgetCss from "./widget.css?inline";
import Component from "./Widget.jsx";

export default {
  css: [bootstrapCss, widgetCss].join("\n"),
  component: Component,
};
