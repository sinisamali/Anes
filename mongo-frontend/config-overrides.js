const { override, addBabelPlugins } = require('customize-cra');

module.exports = override(
  ...addBabelPlugins(
    '@babel/plugin-proposal-class-properties'
  )
);

module.exports = {
    presets: ['react-app'],
    plugins: ['@babel/plugin-proposal-private-property-in-object'],
  };
  
