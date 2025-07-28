import React, { createContext,useContext, useEffect, useState } from "react";

type Theme = "light" | "dark";
type ThemeContextType = {
  theme: Theme;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>("light");
  const [hasMounted,setHasMounted]=useState<boolean>(false);
  useEffect(()=>{
    if(typeof window!=="undefined")
    {
        const storedThem=localStorage.getItem("theme") as Theme|null;
        if(storedThem)
            {
                setTheme(storedThem);
            } 
        else{
            const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
            setTheme(userPrefersDark ? "dark" : "light");
        }
        setHasMounted(true);
    }
  },[]);

  useEffect(() => {
    if (!hasMounted) return; 
    console.log("theme changed to", theme);
    if(typeof window !== "undefined")
    {
        const root=window.document.documentElement;
        if(theme==="dark")
        {
            root.classList.add("dark");
            root.classList.remove("light");
        }
        else
        {
            root.classList.add("light");
            root.classList.remove("dark");
        }
        localStorage.setItem("theme", theme);
    }
  },[theme])

  const toggleTheme=()=>{
    setTheme((prevTheme)=>prevTheme==="light"?"dark":"light")
  }

  return(
    <ThemeContext.Provider value={{theme,toggleTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}

//useTheme hook to access theme context
export const useTheme=(): ThemeContextType => {
    const context=useContext(ThemeContext);
    if(!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
}