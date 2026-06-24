export default function getContrastTextColor(color) {
  const rgb = parseColor(color);

  if (!rgb) {
    return "#000";
  }

  const [r, g, b] = rgb.map((value) => {
    value /= 255;

    return value <= 0.03928
      ? value / 12.92
      : Math.pow((value + 0.055) / 1.055, 2.4);
  });

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  const whiteContrast = 1.05 / (luminance + 0.05);

  const blackContrast = (luminance + 0.05) / 0.05;

  return whiteContrast > blackContrast ? "#fff" : "#000";
}

function parseColor(color) {
  if (!color || typeof color !== "string") {
    return null;
  }

  // #fff
  if (/^#[0-9a-f]{3}$/i.test(color)) {
    return color
      .slice(1)
      .split("")
      .map((hex) => parseInt(hex + hex, 16));
  }

  // #ffffff
  if (/^#[0-9a-f]{6}$/i.test(color)) {
    return [
      parseInt(color.slice(1, 3), 16),
      parseInt(color.slice(3, 5), 16),
      parseInt(color.slice(5, 7), 16),
    ];
  }

  // rgb(...) or rgba(...)
  const rgbMatch = color.match(/\d+(\.\d+)?/g);

  if (rgbMatch && rgbMatch.length >= 3) {
    return rgbMatch.slice(0, 3).map(Number);
  }

  return null;
}
