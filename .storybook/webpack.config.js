// const path = require("path");

// module.exports = async ({ config, mode }) => {
//   return {
//     ...config,
//     resolve: {
//       ...config.resolve,
//       modules: [path.resolve(__dirname, "../src"), ...config.resolve.modules]
//     }
//   };
// };

const path = require("path");

module.exports = async ({ config, mode }) => {
  return {
    ...config,
    resolve: {
      ...config.resolve,
      modules: [path.resolve(__dirname, "../src"), ...config.resolve.modules]
    },
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.scss$/,
          use: [
            'resolve-url-loader',
            'sass-loader'
          ]
        }
      ]
    }
  };
};