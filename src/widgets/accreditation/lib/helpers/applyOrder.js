export default function applyOrder(items, order = [], getId) {
  const idFn = typeof getId === "function" ? getId : (item) => item[getId];

  const orderMap = new Map(order.map((id, index) => [id, index]));

  return [...items].sort((a, b) => {
    const aIndex = orderMap.has(idFn(a)) ? orderMap.get(idFn(a)) : Infinity;
    const bIndex = orderMap.has(idFn(b)) ? orderMap.get(idFn(b)) : Infinity;

    return aIndex - bIndex;
  });
}
