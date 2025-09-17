import { X } from "lucide-react";
import { useEffect, useState } from "react";

type SearchProps = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
};

function Searchbar({ searchQuery, setSearchQuery, placeholder }: SearchProps) {
  const [localValue, setLocalValue] = useState(searchQuery);

  // 🔹 Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchQuery(localValue);
    }, 300); // 300ms debounce
    return () => clearTimeout(handler);
  }, [localValue, setSearchQuery]);

  return (
    <div className="my-4 flex items-center justify-center ">
      <div className="relative w-full max-w-lg">
        <input
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          placeholder={placeholder || "Search..."}
          className="border border-primary rounded-lg p-2 px-4 w-full outline-primary outline-1"
        />
        {localValue && (
          <button
            onClick={() => setLocalValue("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-black"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
}

export default Searchbar;
