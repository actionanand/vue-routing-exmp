module.exports = {
  // options...
  devServer: {
      disableHostCheck: true
  },
  publicPath: process.env.NODE_ENV === 'production'
  ? '/vue-routing-exmp/' // note the trailing slash
  : '/',
}