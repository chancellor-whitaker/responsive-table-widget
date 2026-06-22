export default function countDecimalPlaces(value) {
  // Return 0 if the value is an integer
  if (Math.floor(value) === value) return 0;

  const str = value.toString();

  // Handle scientific notation (e.g., 1e-7)
  if (str.includes("e-")) {
    return parseInt(str.split("e-")[1], 10);
  }

  // Handle standard decimal numbers
  return str.includes(".") ? str.split(".")[1].length : 0;
}
