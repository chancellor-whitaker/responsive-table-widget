// src/components/ShadowPreview.jsx

import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

export default function ShadowPreview({ children, css }) {
  const hostRef = useRef(null);
  const [portalTarget, setPortalTarget] = useState(null);

  useEffect(() => {
    if (!hostRef.current) return;

    const shadowRoot =
      hostRef.current.shadowRoot ??
      hostRef.current.attachShadow({ mode: "open" });

    let style = shadowRoot.querySelector("style[data-shadow-preview]");

    if (!style) {
      style = document.createElement("style");
      style.setAttribute("data-shadow-preview", "");
      shadowRoot.appendChild(style);
    }

    let rootElement = shadowRoot.querySelector("div[data-shadow-preview-root]");

    if (!rootElement) {
      rootElement = document.createElement("div");
      rootElement.setAttribute("data-shadow-preview-root", "");
      shadowRoot.appendChild(rootElement);
    }

    setPortalTarget(rootElement);
  }, []);

  useEffect(() => {
    if (!hostRef.current) return;

    const style = hostRef.current.shadowRoot?.querySelector(
      "style[data-shadow-preview]",
    );

    if (style) {
      style.textContent = css;
    }
  }, [css]);

  return (
    <div ref={hostRef}>
      {portalTarget && createPortal(children, portalTarget)}
    </div>
  );
}
