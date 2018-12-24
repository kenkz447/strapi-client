# React boilerplate for Strapi client

This boilerplate design for development strapi client app

#### Install dependencies:

```shell
npm install
```

#### Run development server:

```shell
npm start
```

With vscode, using `F5` key to run app in debug mode after install `msjsdiag.debugger-for-chrome` extenstion.

#### Build production:

Using `getBuildConfig` to generates webpack config for each environment:

Options:

***definitions***(*Optional*): Object passed to `DefinePlugin`.

***sourceMap***(*Optional*): Enable source map.

***compression***(*Optional*): Enable gzip compression.

***analyzer***(*Optional*): Enable `BundleAnalyzerPlugin`.

Default build command:

```shell
npm run build
```

Default config file:

```shell
./webpack/webpack.config.prod.js
```

Output dir: `./dist`, includes server script and `Dockerfile`.

#### Analyzing dependencies:

```shell
npm run analyzer
```