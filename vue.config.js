module.exports = {
  // Fix Vuex-typescript in prod: https://github.com/istrib/vuex-typescript/issues/13#issuecomment-409869231
//and Fix vuex-typex in prod https://github.com/mrcrowl/vuex-typex/issues/22
  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.optimization.minimizer[0].options.terserOptions = Object.assign(
        {},
        config.optimization.minimizer[0].options.terserOptions,
        {
          ecma: 5,
          compress: {
            keep_fnames: true,
          },
          warnings: false,
          mangle: {
            keep_fnames: true,
          },
        },
      );
    }
  },
}
