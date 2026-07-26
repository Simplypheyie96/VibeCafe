import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./styles/globals.css";

createRoot(document.getElementById("root")!).render(<App />);

// Production only -- a service worker in front of the dev server intercepts
// module requests and makes HMR behave unpredictably.
// Chrome gates `beforeinstallprompt` on a controlled page with a fetch handler,
// so this is what makes the in-app install button reachable at all.
if (import.meta.env.PROD && "serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("/sw.js").catch(() => {
      // Installability falls back to the browser's own menu item. Nothing else
      // in the app depends on the worker, so there is nothing to recover.
    });
  });
}
