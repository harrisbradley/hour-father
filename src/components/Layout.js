// src/components/Layout.js
import { getContainerStyles } from "../styles";
import { useTheme } from "../ThemeContext";

function Layout({ children }) {
  const { darkMode } = useTheme();

  return (
    <div style={getContainerStyles(darkMode)}>
      {children}
    </div>
  );
}

export default Layout;
