import { useEffect } from "react";

export function useClickOutside(ref, callback) {
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the ref exists and if the clicked element is outside the ref's element
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    // Attach the event listener to the document
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside); // Support touch devices

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ref, callback]); // Re-run if ref or callback changes
}
