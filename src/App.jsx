/* src/App.jsx */

import { useDeferredValue, useState, useRef } from "react";

import defaultOptions from "./widgets/accreditation/lib/defaultOptions";
import { RemoteComponent } from "./components/RemoteComponent";
import inputDefs from "./widgets/accreditation/lib/inputDefs";
import { useClickOutside } from "./hooks/useClickOutside";
import formatHtmlString from "./helpers/formatHtmlString";
import ShadowPreview from "./components/ShadowPreview";
// import Widget from "./widgets/accreditation/Widget";
import FormControl from "./components/FormControl";
import shallowEqual from "./helpers/shallowEqual";
import getRandomId from "./helpers/getRandomId";
import FormCheck from "./components/FormCheck";
import widget from "./widgets/accreditation";
import useCopied from "./hooks/useCopied";
import Modal from "./components/Modal";

const Widget = widget.component;

// fix css issues (widget component pulls styles from main)
// highlight the column header being dragged
// vertical ellipsis/icon to indicate draggable

const defaultInstructions =
  "Click Launch Editor to customize the widget. The preview updates automatically as you make changes. You can also drag and drop rows and columns to rearrange them. When you're finished, click Copy Embed Code and paste the generated code into your webpage.";

const arraysAreEqual = (a, b) =>
  a.length === b.length && a.every((val, index) => val === b[index]);

// ATMAE Accreditation

const RemoteHeading = ({
  instructions = defaultInstructions,
  title = "ATMAE Accreditation",
}) => {
  return (
    <div className="d-flex flex-wrap gap-2 align-items-center">
      {title}
      <span className="d-flex my-tooltip" data-tooltip={instructions}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="bi bi-info-circle-fill"
          fill="currentColor"
          viewBox="0 0 16 16"
          height={16}
          width={16}
        >
          <path d="M8 16A8 8 0 1 0 8 0a8 8 0 0 0 0 16m.93-9.412-1 4.705c-.07.34.029.533.304.533.194 0 .487-.07.686-.246l-.088.416c-.287.346-.92.598-1.465.598-.703 0-1.002-.422-.808-1.319l.738-3.468c.064-.293.006-.399-.287-.47l-.451-.081.082-.381 2.29-.287zM8 5.5a1 1 0 1 1 0-2 1 1 0 0 1 0 2" />
        </svg>
      </span>
    </div>
  );
};

const simplifyObject = (object) =>
  Object.fromEntries(
    Object.entries(object).filter(
      ([, val]) =>
        val === null || (typeof val !== "object" && typeof val !== "function"),
    ),
  );

export default function App() {
  const [isModalActive, setIsModalActive] = useState();

  const toggleModal = () => setIsModalActive((b) => !b);

  const [options, setOptions] = useState(defaultOptions);

  const mountOptionNames = [
    ...inputDefs.map(({ name }) => name),
    "rowOrder",
    "columnOrder",
    "editable",
  ];

  const mountOptions = {
    ...Object.fromEntries(
      Object.entries(options).filter(([name]) =>
        mountOptionNames.includes(name),
      ),
    ),
    editable: false,
  };

  const randomId = getRandomId();

  const widgetId = `ier-accreditation-${randomId}`;

  const markup = `<div id=${widgetId}></div><script src="https://irserver2.eku.edu/libraries/remote/accreditation-widget.iife.js?v=${randomId}"></script><script>AccreditationWidget.mount("#${widgetId}", ${JSON.stringify(mountOptions)});</script>`;

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

  const modalRef = useRef();

  useClickOutside(modalRef, toggleModal);

  const [copiedLabel, copyMarkup] = useCopied(
    formatHtmlString(markup),
    "Copy embed code",
  );

  const defaultColOrder =
    "columnOrder" in defaultOptions ? defaultOptions.columnOrder : [];

  const defaultRowOrder =
    "rowOrder" in defaultOptions ? defaultOptions.rowOrder : [];

  // const resetOption = (key, value) =>
  //   setOptions((state) => ({
  //     ...state,
  //     [key]: key in defaultOptions ? defaultOptions[key] : value,
  //   }));

  // const resetColumnOrder = () => resetOption("columnOrder", defaultColOrder);

  // const resetRowOrder = () => resetOption("rowOrder", defaultRowOrder);

  const resetDisabled =
    shallowEqual(simplifyObject(options), simplifyObject(defaultOptions)) &&
    arraysAreEqual(options.columnOrder, defaultColOrder) &&
    arraysAreEqual(options.rowOrder, defaultRowOrder);

  const toolbar = (
    <div className="d-flex flex-wrap gap-2 justify-content-end">
      <button className="btn btn-secondary" onClick={toggleModal} type="button">
        Launch Editor
      </button>
      {/* <button
        disabled={arraysAreEqual(options.columnOrder, defaultColOrder)}
        className="btn btn-primary"
        onClick={resetColumnOrder}
        type="button"
      >
        Reset Column Order
      </button>
      <button
        disabled={arraysAreEqual(options.rowOrder, defaultRowOrder)}
        className="btn btn-primary"
        onClick={resetRowOrder}
        type="button"
      >
        Reset Row Order
      </button> */}
    </div>
  );

  return (
    <>
      <RemoteComponent
        url="https://irserver2.eku.edu/libraries/remote/r19-wrapper.cjs"
        heading={<RemoteHeading></RemoteHeading>}
        toolbar={toolbar}
      >
        <ShadowPreview css={widget.css}>
          <Widget
            {...deferredOptions}
            onOrderChange={(nextOrder) =>
              setOptions((state) => ({
                ...state,
                ...nextOrder,
              }))
            }
            editable={true}
          ></Widget>
        </ShadowPreview>
        {isModalActive && (
          <Modal className="shadow" ref={modalRef}>
            <Modal.Header>
              <Modal.Header.Title>Build embed code</Modal.Header.Title>
              <Modal.Header.Close onClick={toggleModal}></Modal.Header.Close>
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
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button
                className="btn btn-primary"
                onClick={copyMarkup}
                type="button"
              >
                {copiedLabel}
              </button>
              <button
                onClick={() => setOptions(defaultOptions)}
                className="btn btn-primary"
                disabled={resetDisabled}
                type="button"
              >
                Reset
              </button>
            </Modal.Footer>
          </Modal>
        )}
      </RemoteComponent>
    </>
  );
}
