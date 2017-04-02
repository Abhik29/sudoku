(function(){
    let sudoku = require('../services/sudoku_generator_1');
    'use strict';
    exports.map = (function(){
        let map = {};

        map.generatePuzzle = function () {
            return sudoku.generatePuzzle(true);
        }

        return map;
    })()
})();