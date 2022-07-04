import { Configuration, container } from 'webpack';
const dep = require('package.json');

export const webpackConfig: Configuration = {
  output: {
    publicPath: 'http://localhost:4203/',
  },
  experiments: {
    topLevelAwait: true,
  },
  optimization: {
    runtimeChunk: false,
  },
  plugins: [
    new container.ModuleFederationPlugin({
      name: 'logger_app',
      library: { type: 'var', name: 'logger_app' },
      filename: 'remoteEntry.js',
      exposes: {
        './Logger': './src/app/components/logger/logger.component.ts',
      },
      shared: {
        '@angular/core': {
          eager: true,
          singleton: true,
          strictVersion: true,
          requiredVersion: dep.dependencies['@angular/core'],
        },
        '@angular/common': {
          eager: true,
          singleton: true,
          strictVersion: true,
          requiredVersion: dep.dependencies['@angular/common'],
        },
        '@angular/router': {
          eager: true,
          singleton: true,
          strictVersion: true,
          requiredVersion: dep.dependencies['@angular/router'],
        },
      },
    }),
  ],
};
export default webpackConfig;
