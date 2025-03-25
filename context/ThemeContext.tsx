import { Colors } from "@/constants/Colors";
import { createContext, ReactNode, useState } from "react";
import { Appearance, ColorSchemeName } from "react-native";

type ThemeContextType = {
    colorScheme: ColorSchemeName;
    setColorScheme: React.Dispatch<React.SetStateAction<ColorSchemeName>>;
    theme: typeof Colors.light | typeof Colors.dark;
};

export const ThemeContext = createContext<ThemeContextType>({
    colorScheme: "light",
    setColorScheme: () => {},
    theme: Colors.light
});

interface ThemeProviderProps {
    children: ReactNode;
}

export const ThemeContextProvider = ({ children }: ThemeProviderProps) => {

    const [ colorScheme, setColorScheme ] = useState<ColorSchemeName>(Appearance.getColorScheme());

    const theme = colorScheme === "dark" ? Colors.dark : Colors.light;

    return(
        <ThemeContext.Provider value={{
            colorScheme,
            setColorScheme,
            theme
        }}>
            {children}
        </ThemeContext.Provider>
    )
}