import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { QuizProvider } from "./QuizContext";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-light-cyan/theme.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <PrimeReactProvider>
      <QuizProvider>
        <App />
      </QuizProvider>
    </PrimeReactProvider>
  </React.StrictMode>
);
