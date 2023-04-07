# General info
**`webpack-react-ts-starter`** is a boilerplate intended for use with **`React`** projects.

***

# Usage
### `npm install`
Install all dependencies before you start working on a project.

### `npm start`
Start project on a local server (**`http://localhost:1339/`**)
> *the port can be changed in **`webpack.config.js`** in **`devServer`** section*

### `npm run build`
Build project for deployment.

### `npm run test`
Run linters (Eslint, Stylelint) and tests (Jest, Enzyme).

> *All commands can be found in **`package.json`***

# Logging
Notice that console log is depricated in this project
Debug loggs are performed with [debug](https://github.com/visionmedia/debug) module.
Global namespace for app is ```vc```
To turn on all application logs run in browser console:
    ```window.localStorage.setItem("debug", "vc:*")```
All app namespaces list could be found in ```src\utils\logging.ts```

