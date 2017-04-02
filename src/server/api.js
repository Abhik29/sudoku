(function(){
    'use strict';

    let apiMap = require('./controller/apiMap').map;
    let express = require('express');
    let app = express();

    //set port 
    app.set('PORT',process.env.PORT || 3000);

    app.get('/api/v1/getPuzzle',function(req,res){
        res.send(apiMap.generatePuzzle())
    })
    app.listen(app.set('PORT'),function(){
        console.log(`server listening at port ${app.set('PORT')}!`);
    })

})();