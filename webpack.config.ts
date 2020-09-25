import webpack from 'webpack';
import path from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';

export default (() => {
  const mode = 'development';
  const rules: webpack.RuleSetRule[] = [
    {
      test: /\.tsx?$/,
      use: 'ts-loader',
    },
    {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    },
  ];
  const module: webpack.Module = {
    rules,
  };
  const entry: webpack.Entry = {
    app: './src/app.tsx',
  };
  const output: webpack.Output = {
    filename: 'app.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  };
  const plugins: webpack.Plugin[] = [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: 'public',
          to: '',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      scriptLoading: 'defer',
    }),
  ];
  const resolve: webpack.Resolve = {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json'),
      }),
    ],
  };

  const devtool: webpack.Options.Devtool = 'source-map';

  const config: webpack.Configuration = {
    mode,
    entry,
    module,
    output,
    plugins,
    resolve,
    devtool,
  };
  return config;
})();
