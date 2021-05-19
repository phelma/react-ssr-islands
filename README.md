# React SSR Quickstart ⚛️ 📦
> Starter template for server-side and client-side rendering of a React app

[![GitHub tag](https://img.shields.io/github/tag/MichaelCurrin/react-ssr-quickstart?include_prereleases=&sort=semver)](https://github.com/MichaelCurrin/react-ssr-quickstart/releases/)
[![License](https://img.shields.io/badge/License-MIT-blue)](#license)

[![Made with Node.js](https://img.shields.io/badge/Node.js->=12-blue?logo=node.js&logoColor=white)](https://nodejs.org)
[![Package - react](https://img.shields.io/github/package-json/dependency-version/MichaelCurrin/react-ssr-quickstart/react?logo=react&logoColor=white)](https://www.npmjs.com/package/react)
[![Package - express](https://img.shields.io/github/package-json/dependency-version/MichaelCurrin/react-ssr-quickstart/dev/express)](https://www.npmjs.com/package/express)


## Preview

<div align="center">
    <img src="/sample.png" alt="Sample screenshot" title="Sample screenshot" width="300" />
</div>


## Use this project

<div align="center">

[![Use this template](https://img.shields.io/badge/Generate-Use_this_template-2ea44f?style=for-the-badge)](https://github.com/MichaelCurrin/react-ssr-quickstart/generate)

</div>


## About

### Background

Based on tutorial:

- [How to server-side render React, hydrate it on the client and combine client and server routes](https://dev.to/marvelouswololo/how-to-server-side-render-react-hydrate-it-on-the-client-and-combine-client-and-server-routes-1a3p)

We set up a client-side React app with some components including an incrementing counter.

On initial page load without JS running, a user or a search engine crawler will see an empty page. So we add a server-side Express app that return an HTML page which acts as a fully-rendered starting point that needs no JS to view in the browser.

We do this by calling `ReactDOMServer.renderToString`, which unfortunately freezes the app so that ignores user interaction. This is solved by calling `React.hydrate` on the client, so that the browser can make the initial HTML and turn it into a dynamic app in the usual SPA style.

The benefit is your page will load faster for users and the search engines will crawl and rank your site better. The downside is that this adds extra overheard to your app structure and also requires you to have a Node Express server running.While with the plain SPA flow, you build your static assets and host those somewhere like GitHub Pages without the need for Node.

### Structure

- `src`
    - [client.jsx](/src/client.jsx) - Hydrate the app and pass it parameters.
    - [server.js](/src/server.js) - Server-Side Rendering entry-point. Includes rendering of HTML of initial app.
- `dist` - Output directory generated by Webpack.

Note that there is no point in setting up a plain `.html` file here, since this app is designed to run only with a Node server and frontend static assets. Unlike the traditional Create React App flow which has a standalone `index.html` which gets added to the `build` directory. And you can still run build command in the SSR app, but it generates JS for loading on the homepage, but not a `.html` file.


## Resources

- Learn more about React on [Dev Resources](https://michaelcurrin.github.io/dev-resources/resources/javascript/packages/react/).
- [React.hydrate](https://reactjs.org/docs/react-dom.html#hydrate) in the docs.
- [Hydration and Server-side Rendering](https://blog.somewhatabstract.com/2020/03/16/hydration-and-server-side-rendering/) blog post series around React.


## Documentation

### Requirements

- Node
- Make
    - A task runner than is standard on macOS and Linux but must be installed on Windows.
    - See [Makefile](/Makefile) for commands you can run with `make COMMAND`.

### Installation

```sh
$ make install
```

### Usage

Start the dev server:

```sh
$ make serve
```

That will:

- Run the Webpack build task and then continue to build by watching for changes.
- Run the Node app using `nodemon` and Express.

The `make` command already allows parallel jobs with the `-j` flag as set in [Makefile](/Makefile), so that avoids having to depend on another package like `concurrently`.

Then open the browser at:

- http://localhost:3000


## License

Released under [MIT](/LICENSE) by [@MichaelCurrin](https://github.com/MichaelCurrin).
