export default function createProxyComponent({
  classNameAccessor: classNameAccessor1,
  className: className1,
  as: as1 = "div",
  ...props1
}) {
  const Component = ({
    classNameAccessor = (a, b) => [a, b].filter(Boolean).join(" "),
    className: className2,
    as = as1,
    ...props2
  }) => {
    const As = as;

    const props = {
      ...props1,
      ...props2,
      className: classNameAccessor(className1, className2),
    };

    return <As {...props}></As>;
  };

  return Component;
}
