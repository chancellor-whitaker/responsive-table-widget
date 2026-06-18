import { useId } from "react";

export default function FormCheck({ className, children, ...rest }) {
  const id = useId();

  return (
    <div className={["form-check", className].filter(Boolean).join(" ")}>
      <input {...rest} className="form-check-input" id={id} />
      <label className="form-check-label" htmlFor={id}>
        {children}
      </label>
    </div>
  );
}
