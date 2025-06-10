import { createRoot } from "react-dom/client";
import "./styles/index.css";
import App from "./App.jsx";
import { LoadingProvider } from "./contexts/LoadingContext";
import { GenreProvider } from "./contexts/GenreContext.jsx";

createRoot(document.getElementById("root")).render(
  <LoadingProvider>
    <GenreProvider>
      <App />
    </GenreProvider>
  </LoadingProvider>
);
