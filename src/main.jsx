import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { QuizContextProvider } from "./components/QuizContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QuizContextProvider>
      <App />
    </QuizContextProvider>
  </StrictMode>,
);
