let env = process.env.env||'dev';

if (env === 'dev') {
    console.log("Dev build is in Progress!");
    module.exports = require('./config/webpack.dev.js');
} else if(env === 'prod') {
    console.log("Prod build is in Progress!");
    module.exports = require('./config/webpack.prod.js');
}
