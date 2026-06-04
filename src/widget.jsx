import { createRoot } from "react-dom/client";
import { widgetRuntime } from "./widget.runtime";

const roots = new Map();

function getElement(target) {
  return typeof target === "string" ? document.querySelector(target) : target;
}

function mount(target, options = {}) {
  const element = getElement(target);

  if (!element) {
    console.error(`${widgetRuntime.name}: target element not found.`);
    return;
  }

  let root = roots.get(element);

  if (!root) {
    root = createRoot(element);
    roots.set(element, root);
  }

  const Component = widgetRuntime.component;

  root.render(<Component {...options} />);
}

function unmount(target) {
  const element = getElement(target);
  if (!element) return;

  const root = roots.get(element);

  if (root) {
    root.unmount();
    roots.delete(element);
  }
}

window[widgetRuntime.name] = {
  mount,
  unmount,
};
