(function(){
    'use strict';

    let apiMap = require('./controller/apiMap').map;
    let express = require('express');
    let app = express();
    app.get('/api/v1/getPuzzle',function(req,res){
        res.send(apiMap.generatePuzzle())
    })
    app.listen(443,function(){
        console.log('server listening at port 80!');
    })

})();