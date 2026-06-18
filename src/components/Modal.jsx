import createProxyComponent from "../createProxyComponent.jsx";

export default function Modal({
  classNameAccessor = (a, b) => [a, b].filter(Boolean).join(" "),
  className,
  children,
  ref,
}) {
  return (
    <div
      style={{ display: "block" }}
      className="modal fade show"
      tabIndex={-1}
      role="dialog"
    >
      <div className="modal-dialog modal-sm modal-dialog-centered modal-dialog-scrollable">
        <div
          className={classNameAccessor("modal-content", className)}
          ref={ref}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

const Header = createProxyComponent({ className: "modal-header" });

const Title = createProxyComponent({
  className: "modal-title fs-5",
  children: "Modal title",
  as: "h1",
});

const Close = createProxyComponent({
  className: "btn-close",
  type: "button",
  as: "button",
});

const Body = createProxyComponent({
  children: <p>Woo-hoo, you’re reading this text in a modal!</p>,
  className: "modal-body",
});

const Footer = createProxyComponent({
  children: (
    <>
      <button className="btn btn-secondary" type="button">
        Close
      </button>
      <button className="btn btn-primary" type="button">
        Save changes
      </button>
    </>
  ),
  className: "modal-footer",
});

Modal.Header = Header;

Header.Title = Title;

Header.Close = Close;

Modal.Body = Body;

Modal.Footer = Footer;
