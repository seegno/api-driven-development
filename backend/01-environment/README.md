# 01. Preparing your environment

First, we need to install `io.js`, the modern, ES6-ready version of `node.js`. There are two ways of installing io.js:

1. Through `iojs.org` installers (see `https://iojs.org/dist/v1.2.0/`).
2. Using a node version manager.

A node version manager provides a nice cli-based interface and also allows you to switch back-and-forth between different version of io.js, so we're picking one.
There are several node version managers available (`nvm`/`n`/`nave`), each with advantages and disadvantages. We prefer `nvm`.

The following examples are specific to OSX. Windows users can give [nvm-windows](https://github.com/coreybutler/nvm-windows) a try.

* Install [nvm](https://github.com/creationix/nvm):

```bash
curl https://raw.githubusercontent.com/creationix/nvm/v0.23.3/install.sh | bash
```

* Use `nvm` to install `iojs`:

```bash
nvm install iojs
nvm use iojs
```

* Make sure the `node` executable is available:

```bash
node -v
v1.2.0
```
