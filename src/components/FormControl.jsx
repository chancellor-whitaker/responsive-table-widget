import { useId } from "react";

export default function FormControl({ className, children, type, ...rest }) {
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
}
