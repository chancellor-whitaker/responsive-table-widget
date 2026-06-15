import { createRoot } from "react-dom/client";

import { widgetRuntime } from "./widget.runtime";

const roots = new Map();

function mount(target, options = {}) {
  const element = getElement(target);

  if (!element) {
    console.error(`${widgetRuntime.name}: target element not found.`);
    return;
  }

  let record = roots.get(element);

  if (!record) {
    const shadowRoot = element.attachShadow({ mode: "open" });

    const style = document.createElement("style");
    style.textContent = widgetRuntime.css;
    shadowRoot.appendChild(style);

    const rootElement = document.createElement("div");
    shadowRoot.appendChild(rootElement);

    const root = createRoot(rootElement);

    record = { rootElement, shadowRoot, root };
    roots.set(element, record);
  }

  const Component = widgetRuntime.component;

  record.root.render(<Component {...options} />);
}

function unmount(target) {
  const element = getElement(target);
  if (!element) return;

  const record = roots.get(element);

  if (record) {
    record.root.unmount();
    element.shadowRoot.innerHTML = "";
    roots.delete(element);
  }
}

function getElement(target) {
  return typeof target === "string" ? document.querySelector(target) : target;
}

window[widgetRuntime.name] = {
  unmount,
  mount,
};
