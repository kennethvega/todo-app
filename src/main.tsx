import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import UserProvider from "./context/AuthContext";
import "tippy.js/dist/tippy.css";

import "./styles/global.css";
import { Provider } from "urql";
import { createClient } from "@urql/core";
import { defaultExchanges } from "urql";
const client = createClient({
  url: "http://localhost:5000/graphql",
  exchanges: defaultExchanges,
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider value={client}>
      <UserProvider>
        <App />
      </UserProvider>
    </Provider>
  </React.StrictMode>
);
