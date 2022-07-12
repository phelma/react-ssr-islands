import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { PassThrough } from "stream";
import App from "./App.jsx";
import {
  IslandStateContextProvider,
  ServerIslandStateContext,
  ServerIslandStateContextProvider,
} from "./IslandStateContext.jsx";

const PORT = 3000;

function streamToString(stream) {
  // The React stream doesn't have .on so we have to use a passthrough stream.
  const s = new PassThrough()
  stream.pipe(s)
  const chunks = [];
  return new Promise((resolve, reject) => {
    s.on("data", (chunk) => chunks.push(Buffer.from(chunk)));
    s.on("error", (err) => reject(err));
    s.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
  });
}

function renderHtml({ title, description, initialData, app }) {
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
    <div id="root">${app}</div>
  </body>
</html>
`;
}

const app = express();

app.get("/", (_req, res) => {
  const initialData = {
    username: "developer",
    title: "React Island Spike",
    description:
      "Starter template for server-side and client-side rendering of a React app",
  };

  const { username, title, description } = initialData;

  const islandState = {};

  let didError = false

  const stream = ReactDOMServer.renderToPipeableStream(
    <IslandStateContextProvider islandState={islandState}>
      <App username={username} title={title} description={description} />
    </IslandStateContextProvider>,
    {
      async onAllReady() {
        res.statusCode = didError ? 500 : 200;
        res.setHeader("Content-type", "text/html");

        // Buffer the whole stream to a string for now
        const app = await streamToString(stream);
        console.log(app)
        initialData.islandState = islandState;

        const html = renderHtml({ title, description, initialData, app });
        res.send(html);
      },
      onShellError(error) {
        // Something errored before we could complete the shell so we emit an alternative shell.
        res.statusCode = 500;
        res.send(
          '<!doctype html><p>Loading...</p><script src="clientrender.js"></script>'
        );
      },
      onError(err) {
        didError = true;
        console.error(err);
      },
    }
  );
});

const publicDir = path.resolve(__dirname, "..", "client");
console.log(`Serving static files from ${publicDir}`);
app.use("/static", express.static(publicDir));

app.listen(PORT);

console.log(`LISENING ON ${PORT}`);
