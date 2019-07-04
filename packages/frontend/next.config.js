module.exports = () => {
  /* eslint-disable */
  const withTypescript = require('@zeit/next-typescript');
  const withLess = require('@zeit/next-less');
  const lessToJS = require('less-vars-to-js');
  const fs = require('fs');
  const path = require('path');
  require('dotenv').config();
  // Where your antd-custom.less file lives
  const themeVariables = lessToJS(
    fs.readFileSync(
      path.resolve(__dirname, './assets/antd-custom.less'),
      'utf8'
    )
  );
  // fix: prevents error when .less files are required by node
  if (typeof require !== 'undefined') {
    require.extensions['.less'] = file => {};
  }
  return withTypescript(
    withLess({
      lessLoaderOptions: {
        javascriptEnabled: true,
        modifyVars: themeVariables // make your antd custom effective
      },
      env: {
        REACT_APP_API_URL: process.env.REACT_APP_API_URL
      },
      exportPathMap: () => ({
        '/': { page: '/' }
      })
    })
  );
};
