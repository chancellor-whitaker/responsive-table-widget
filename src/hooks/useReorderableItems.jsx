// src/widgets/accreditation/lib/useReorderableItems.js

import { useState } from "react";

export default function useReorderableItems({
  enabled = false,
  onOrderChange,
  items,
  getId,
}) {
  const [draggedIndex, setDraggedIndex] = useState(null);

  function getDragProps(index) {
    if (!enabled) return {};

    return {
      onDrop() {
        if (draggedIndex === null) return;

        const nextItems = moveItem(items, draggedIndex, index);
        const nextOrder = nextItems.map(getId);

        onOrderChange?.(nextOrder);
        setDraggedIndex(null);
      },

      onDragOver(event) {
        event.preventDefault();
      },

      onDragStart() {
        setDraggedIndex(index);
      },

      onDragEnd() {
        setDraggedIndex(null);
      },

      draggable: true,
    };
  }

  return {
    getDragProps,
    draggedIndex,
  };
}

function moveItem(array, fromIndex, toIndex) {
  const copy = [...array];
  const [item] = copy.splice(fromIndex, 1);
  copy.splice(toIndex, 0, item);
  return copy;
}
