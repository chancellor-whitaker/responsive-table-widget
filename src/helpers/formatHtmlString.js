export default function formatHtmlString(html) {
  let formatted = "";
  let indent = "";
  const tab = "  "; // 2-space indentation

  // Split the string into individual opening, closing, and content blocks
  html.split(/>\s*</).forEach((element) => {
    if (element.match(/^\/\w/)) {
      // If it's a closing tag, decrease the indentation first
      indent = indent.substring(tab.length);
    }

    formatted += indent + "<" + element + ">\n";

    if (
      element.match(/^<?\w[^>]*[^\/]$/) &&
      !element.startsWith("input") &&
      !element.startsWith("img")
    ) {
      // If it's an opening tag, increase the indentation for the next line
      indent += tab;
    }
  });

  return formatted.substring(1, formatted.length - 2);
}
