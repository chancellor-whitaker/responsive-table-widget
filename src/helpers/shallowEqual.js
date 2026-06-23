export default function shallowEqual(objA, objB) {
  // 1. Check if they are the exact same reference
  if (objA === objB) return true;

  // 2. Check if either is null or not an object
  if (
    typeof objA !== "object" ||
    objA === null ||
    typeof objB !== "object" ||
    objB === null
  ) {
    return false;
  }

  // 3. Compare lengths of keys
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;

  // 4. Check if every key exists and has the same value in both objects
  for (let key of keysA) {
    if (!objB.hasOwnProperty(key) || objA[key] !== objB[key]) {
      return false;
    }
  }

  return true;
}
