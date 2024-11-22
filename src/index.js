import React from "react";
import ReactDOM from "react-dom/client";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import App from "./App";

import { RoomProvider } from "./context/RoomDetailsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RoomProvider>
      <App />
    </RoomProvider>

    <ToastContainer />
  </React.StrictMode>
);
