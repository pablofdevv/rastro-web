import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import { CurrentUserProvider } from "./features/users/CurrentUserProvider";
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrentUserProvider>
        <App />
      </CurrentUserProvider>
    </Provider>
  </React.StrictMode>
);
