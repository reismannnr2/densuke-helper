import webpack from 'webpack';
import config from './webpack.config';

const mode = 'production';
const prod: webpack.Configuration = {
  ...config,
  mode,
};

export default prod;
