import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App.jsx";
import {
  IslandStateContextProvider,
  ServerIslandStateContext,
  ServerIslandStateContextProvider,
} from "./IslandStateContext.jsx";

const PORT = 3000;

function renderHtml({ title, description, initialData, component }) {
  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>${title}</title>
    <meta name="description" content="${description}">

    <style>
      body {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
          "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;

        max-width: 600px;
        margin: 0 auto;

        /* Background color to go to page edge. */

      }

      body > * {
        /* Prevent content from going to the page edge - especially on mobile.
          Note this should not be on body itself, otherwise it gets white edges. */
        padding-left: 15px;
        padding-right: 15px;
      }
    </style>

    <script>
      window.__INITIAL__DATA__ = ${JSON.stringify(initialData)};
    </script>

    <script defer src="/static/main.bundle.js"></script>
  </head>

  <body>
    <div id="root">${component}</div>
  </body>
</html>
`;
}

/**
 * Render an HTML page as a string.
 *
 * Don't add whitespace around component in the mountpoint, otherwise a warning
 * appears about a mismatch of content.
 */
function page(initialData) {
  const { username, title, description } = initialData;

  const islandState = {};

  const component = ReactDOMServer.renderToString(
    <IslandStateContextProvider islandState={islandState}>
      <App username={username} title={title} description={description} />
    </IslandStateContextProvider>
  );

  initialData.islandState = islandState;

  return renderHtml({ title, description, initialData, component });
}

const app = express();

app.get("/", (_req, res) => {
  const initialData = {
    username: "developer",
    title: "React Island Spike",
    description:
      "Starter template for server-side and client-side rendering of a React app",
  };

  const html = page(initialData);
  res.send(html);
});

const publicDir = path.resolve(__dirname, "..", "client");
console.log(`Serving static files from ${publicDir}`);
app.use("/static", express.static(publicDir));

app.listen(PORT);

console.log(`LISENING ON ${PORT}`);
