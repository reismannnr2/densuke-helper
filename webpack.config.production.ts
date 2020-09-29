import webpack from 'webpack';
import config from './webpack.config';
import path from 'path';

const mode = 'production';
const prod: webpack.Configuration = {
  ...config,
  output: {
    ...config.output,
    path: path.resolve(__dirname, 'docs'),
    publicPath: '/densuke-helper',
  },
  mode,
};

export default prod;
