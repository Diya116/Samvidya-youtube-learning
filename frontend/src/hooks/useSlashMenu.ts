import { useState, useEffect } from "react";
import  type { Command, MenuPosition } from "@/types/Note";
import { calculateMenuPosition } from "@/utils/noteeditor/menu-positioning";
export const useSlashMenu = (commands: Command[]) => {
  const [showMenu, setShowMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [menuPosition, setMenuPosition] = useState<MenuPosition>({ top: 0, left: 0 });

  const filteredCommands = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(query.toLowerCase())
  );

  // Reset selected index when filtered commands change
  useEffect(() => {
    setSelectedIndex(0);
  }, [filteredCommands.length, query]);

  const openMenu = (coords: any, editorRect: DOMRect) => {
    const position = calculateMenuPosition(coords, editorRect);
    setMenuPosition(position);
    setShowMenu(true);
    setQuery("");
    setSelectedIndex(0);
  };

  const closeMenu = () => {
    setShowMenu(false);
    setQuery("");
    setSelectedIndex(0);
  };

  const updateQuery = (newQuery: string) => {
    setQuery(newQuery);
  };

  const navigateUp = () => {
    setSelectedIndex((prev) => 
      prev > 0 ? prev - 1 : filteredCommands.length - 1
    );
  };

  const navigateDown = () => {
    setSelectedIndex((prev) => 
      prev < filteredCommands.length - 1 ? prev + 1 : 0
    );
  };

  return {
    showMenu,
    query,
    selectedIndex,
    menuPosition,
    filteredCommands,
    openMenu,
    closeMenu,
    updateQuery,
    navigateUp,
    navigateDown,
  };
};
