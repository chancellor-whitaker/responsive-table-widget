import { useState } from "react";

export default function useCopied(a = "Hello from React!", b = "Copy Text") {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(a);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return [copied ? "Copied!" : b, handleCopy];
}

// export default function ClipboardExample() {
//   const [copied, setCopied] = useState(false);

//   const handleCopy = async () => {
//     try {
//       await navigator.clipboard.writeText("Hello from React!");
//       setCopied(true);
//       setTimeout(() => setCopied(false), 2000);
//     } catch (err) {
//       console.error("Failed to copy: ", err);
//     }
//   };

//   return (
//     <div>
//       <button onClick={handleCopy}>{copied ? "Copied!" : "Copy Text"}</button>
//     </div>
//   );
// }
