module.exports = {
    database:
    process.env.MONGODB_URI || 'mongodb://admin:password@ds259768.mlab.com:59768/code-tutor',
    port: process.env.PORT || 3000,
    secret: 'ijiwjid'
  };
  