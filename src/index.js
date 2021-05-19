import express from "express";
import path from "path";
import React from "react";
import ReactDOMServer from "react-dom/server";
import App from "./App.jsx";

const app = express();

app.use("/static", express.static(path.resolve(__dirname, "public")));

app.get("/", (_req, res) => {
  const name = "World";

  const component = ReactDOMServer.renderToString(<App name={name} />);

  const html = `
  <!DOCTYPE html>
    <html>
    <head>
      <script>window.__INITIAL__DATA__ = ${JSON.stringify({ name })}</script>
    </head>
    <body>

    <div id="root">${component}</div>

    <script src="/static/home.js"></script>
  </body>
  </html>
  `;

  res.send(html);
});

app.listen(3000);
