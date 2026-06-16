import { useDeferredValue, useState } from "react";

import defaultOptions from "./widgets/example/lib/defaultOptions";
import inputDefs from "./widgets/example/lib/inputDefs";
import Widget from "./widgets/example/Widget";

// add font size option

export default function App() {
  const [options, setOptions] = useState(defaultOptions);

  const relevantOptions = Object.fromEntries(
    Object.entries(options).filter(([n]) =>
      inputDefs.find(({ name }) => name === n),
    ),
  );

  console.log(relevantOptions);

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

  return (
    <>
      <div className="d-flex flex-column gap-3">
        <div className="d-flex flex-column gap-2">
          {inputDefs.map(({ name, label = name, type }) => (
            <label>
              {label}
              <input
                onChange={onChange}
                name={name}
                type={type}
                {...(type === "checkbox"
                  ? { checked: deferredOptions[name] }
                  : { value: deferredOptions[name] })}
              ></input>
            </label>
          ))}
        </div>
        <Widget {...deferredOptions}></Widget>
      </div>
    </>
  );
}
