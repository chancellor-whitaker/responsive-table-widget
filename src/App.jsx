import { useDeferredValue, useState, useId } from "react";

import defaultOptions from "./widgets/example/lib/defaultOptions";
import inputDefs from "./widgets/example/lib/inputDefs";
import Widget from "./widgets/example/Widget";
import Modal from "./Modal";

export default function App() {
  const [options, setOptions] = useState(defaultOptions);

  const mountOptions = Object.fromEntries(
    Object.entries(options).filter(([n]) =>
      inputDefs.find(({ name }) => name === n),
    ),
  );

  const markup = `<div id="example-widget"></div><script src="https://chancellor-whitaker.github.io/responsive-table-widget//example-widget.iife.js?v=50000000"></script><script>ExampleWidget.mount("#example-widget", ${JSON.stringify(mountOptions)});</script>`;

  const onChange = ({ target: { checked, value, type, name } }) =>
    setOptions((state) =>
      Object.fromEntries(
        Object.entries(state).map((entry) =>
          entry[0] !== name
            ? entry
            : [name, type === "checkbox" ? checked : value],
        ),
      ),
    );

  const deferredOptions = useDeferredValue(options);

  const copyMarkup = () =>
    navigator.clipboard.writeText(formatHtmlString(markup));

  return (
    <>
      <Widget {...deferredOptions}></Widget>
      <Modal className="shadow opacity-75">
        <Modal.Header>
          <Modal.Header.Title>Build embed code</Modal.Header.Title>
          <Modal.Header.Close></Modal.Header.Close>
        </Modal.Header>
        <Modal.Body>
          <div className="d-flex flex-column gap-2">
            {inputDefs.map(({ name, label = name, type }) =>
              type === "checkbox" ? (
                <FormCheck
                  checked={deferredOptions[name]}
                  onChange={onChange}
                  name={name}
                  type={type}
                >
                  {label}
                </FormCheck>
              ) : (
                <FormControl
                  className="d-flex align-items-center gap-2"
                  value={deferredOptions[name]}
                  onChange={onChange}
                  name={name}
                  type={type}
                >
                  {label}
                </FormControl>
              ),
            )}
            {/* <textarea ref={markupRef} value={markup} rows={3}></textarea> */}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary"
            onClick={copyMarkup}
            type="button"
          >
            Copy embed code
          </button>
          <button className="btn btn-secondary" type="button">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const FormControl = ({ className, children, type, ...rest }) => {
  const id = useId();

  const formLabel = (
    <label className="form-label m-0" htmlFor={id}>
      {children}
    </label>
  );

  return (
    <div className={className}>
      {type !== "color" && formLabel}
      <input
        {...rest}
        className={["form-control", type === "color" && "form-control-color"]
          .filter(Boolean)
          .join(" ")}
        type={type}
        id={id}
      />
      {type === "color" && formLabel}
    </div>
  );
};

const FormCheck = ({ className, children, ...rest }) => {
  const id = useId();

  return (
    <div className={["form-check", className].filter(Boolean).join(" ")}>
      <input {...rest} className="form-check-input" id={id} />
      <label className="form-check-label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
};

function formatHtmlString(html) {
  let formatted = "";
  let indent = "";
  const tab = "  "; // 2-space indentation

  // Split the string into individual opening, closing, and content blocks
  html.split(/>\s*</).forEach((element) => {
    if (element.match(/^\/\w/)) {
      // If it's a closing tag, decrease the indentation first
      indent = indent.substring(tab.length);
    }

    formatted += indent + "<" + element + ">\n";

    if (
      element.match(/^<?\w[^>]*[^\/]$/) &&
      !element.startsWith("input") &&
      !element.startsWith("img")
    ) {
      // If it's an opening tag, increase the indentation for the next line
      indent += tab;
    }
  });

  return formatted.substring(1, formatted.length - 2);
}

function copyToClipboard(element) {
  // Select the text field
  element.select();
  element.setSelectionRange(0, 99999); // For mobile devices

  // Copy the text inside the text field
  navigator.clipboard.writeText(element.value);
}
