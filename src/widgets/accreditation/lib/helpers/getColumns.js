export default (rows, labels = {}) => {
  return Object.keys(rows.length > 0 ? rows[0] : {}).map((key) => ({
    label: key in labels ? labels[key] : key,
    key,
  }));
};
