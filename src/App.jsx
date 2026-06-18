import { useDeferredValue, useState, useRef } from "react";

import defaultOptions from "./widgets/accreditation/lib/defaultOptions";
import { RemoteComponent } from "./components/RemoteComponent";
import inputDefs from "./widgets/accreditation/lib/inputDefs";
import { useClickOutside } from "./hooks/useClickOutside";
import formatHtmlString from "./helpers/formatHtmlString";
import Widget from "./widgets/accreditation/Widget";
import FormControl from "./components/FormControl";
import FormCheck from "./components/FormCheck";
import useCopied from "./hooks/useCopied";
import Modal from "./components/Modal";

// hover question mark to explain page
// change "accreditation" verbiage

export default function App() {
  const [isModalActive, setIsModalActive] = useState();

  const toggleModal = () => setIsModalActive((b) => !b);

  const [options, setOptions] = useState(defaultOptions);

  const mountOptions = Object.fromEntries(
    Object.entries(options).filter(([n]) =>
      inputDefs.find(({ name }) => name === n),
    ),
  );
  // hover question mark to explain page
  // change "accreditation" verbiage
  // id={`ier-${uniqueId}`}
  const markup = `<div id="accreditation-widget"></div><script src="https://chancellor-whitaker.github.io/responsive-table-widget/accreditation-widget.iife.js?v=1"></script><script>AccreditationWidget.mount("#accreditation-widget", ${JSON.stringify(mountOptions)});</script>`;

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

  return (
    <>
      <RemoteComponent
        toolbar={
          <div>
            <button
              className="btn btn-primary"
              onClick={toggleModal}
              type="button"
            >
              Launch editor
            </button>
          </div>
        }
        url="https://irserver2.eku.edu/libraries/remote/r19-wrapper.cjs"
        heading="Create embeddable widget"
      >
        <Widget {...deferredOptions}></Widget>
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
                className="btn btn-secondary"
                onClick={toggleModal}
                type="button"
              >
                Close
              </button>
            </Modal.Footer>
          </Modal>
        )}
      </RemoteComponent>
    </>
  );
}
