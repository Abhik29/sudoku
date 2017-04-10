let env = process.env.NODE_ENV||'development';
console.log(process.env);

if (env === 'development') {
    console.log("Dev build is in Progress!");
    module.exports = require('./config/webpack.dev.js');
} else if(env === 'production') {
    console.log("Prod build is in Progress!");
    module.exports = require('./config/webpack.prod.js');
}
