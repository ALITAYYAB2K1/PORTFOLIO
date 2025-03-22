import { useState } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import "./App.css";

function App() {
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      {children}
    </ThemeProvider>
  );
}

export default App;
