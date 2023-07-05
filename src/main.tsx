import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeUIProvider } from "theme-ui";
import { Provider } from "react-redux";
import { Global, css } from "@emotion/react";

import theme from "./theme";
import App from "./App";
import { store } from "./app-state";

const globalStyles = css`
    body {
        font-family: "Poppins", sans-serif;
    }
`;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <Provider store={store}>
            <ThemeUIProvider theme={theme}>
                <Global styles={globalStyles} />
                <App />
            </ThemeUIProvider>
        </Provider>
    </React.StrictMode>
);
