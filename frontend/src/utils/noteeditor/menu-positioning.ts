import {type MenuPosition } from "@/types/Note";

export const calculateMenuPosition = (
  coords: { top: number; bottom: number; left: number },
  editorRect: DOMRect
): MenuPosition => {
  // Calculate position
  let top = coords.bottom - editorRect.top + 5;
  let left = coords.left - editorRect.left;
  
  // Menu dimensions (approximate)
  const menuHeight = 280;
  const menuWidth = 256;
  
  // Check if menu would go below viewport
  const viewportHeight = window.innerHeight;
  const editorTop = editorRect.top;
  const absoluteMenuBottom = editorTop + top + menuHeight;
  
  // If menu would overflow below, position it above the cursor
  if (absoluteMenuBottom > viewportHeight - 20) {
    top = coords.top - editorRect.top - menuHeight - 5;
  }
  
  // Check if menu would overflow to the right
  const viewportWidth = window.innerWidth;
  const editorLeft = editorRect.left;
  const absoluteMenuRight = editorLeft + left + menuWidth;
  
  // If menu would overflow to the right, position it to the left
  if (absoluteMenuRight > viewportWidth - 20) {
    left = coords.left - editorRect.left - menuWidth;
  }
  
  // Ensure menu doesn't go above editor or to the left
  top = Math.max(5, top);
  left = Math.max(5, left);

  return { top, left };
};