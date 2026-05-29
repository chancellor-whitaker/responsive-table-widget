import { createRoot } from "react-dom/client";
import TableWidgetApp from "./TableWidgetApp.jsx";
import "./responsive-table.css";

const roots = new Map();

function getElement(target) {
  if (typeof target === "string") {
    return document.querySelector(target);
  }

  return target;
}

function mount(target) {
  const element = getElement(target);

  if (!element) {
    console.error("ResponsiveTableWidget: target element not found.");
    return;
  }

  let root = roots.get(element);

  if (!root) {
    root = createRoot(element);
    roots.set(element, root);
  }

  root.render(<TableWidgetApp />);
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

window.ResponsiveTableWidget = {
  mount,
  unmount,
};
