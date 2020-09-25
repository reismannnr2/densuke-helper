import webpack from 'webpack';
import config from './webpack.config';
import WebpackDevServer from 'webpack-dev-server';

const mode = 'development';

const entry: webpack.Entry = {
  app: [
    'webpack-dev-server/client?http://localhost:8081',
    'webpack/hot/only-dev-server',
    './src/index.tsx',
  ],
};

const devServer: WebpackDevServer.Configuration = {
  port: 8081,
  hot: true,
  publicPath: '/',
};

const plugins: webpack.Plugin[] = [
  new webpack.HotModuleReplacementPlugin(),
  ...(config.plugins || []),
];

const devtool: webpack.Options.Devtool = 'cheap-module-eval-source-map';

const resolve: webpack.Resolve = {
  ...config.resolve,
  alias: {
    ...config.resolve?.alias,
    'react-dom': '@hot-loader/react-dom',
  },
};

const serverConfig: webpack.Configuration = {
  ...config,
  mode,
  entry,
  plugins,
  resolve,
  devServer,
  devtool,
};

export default serverConfig;
