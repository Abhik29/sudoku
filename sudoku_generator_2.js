(function(){
    // let dimension = 9;
    // board = [];
    // for (let row=0;row<dimension;row++) {
    //     board[row]=[];
    //     iterator.setBlockDisplayForRow(row);
    //     for (let column=0;column<dimension;column++) {
    //         if (iterator.fillColumn(column)) {
    //             board[row][column]='X';
    //         } else {
    //             board[row][column]='';
    //         }
    //     }
    // }
    // console.log(board);

    'use strict';


    let augMath = require('./augment.Math').math;
    let iterator = require('./block_iterator');
    
    let dimension
    , maxRestartCycleCount  //max number 
    , rootNumber
    , numberList = []
    , board = []
    , status = {}
    , restartCounter
    , restartCycleCount;

    let setDrivers = function(options = {}) {
        //validate user defined dimension
        if (options.dimension&&!isDimensionValid(options.dimension)) {
            throw Error('Dimention is not a perfect Square!');
        }

        // set the options to generate the board
        dimension = options.dimension || 9;
        maxRestartCycleCount = options.maxRestartCycleCount || 11;
        rootNumber = Math.sqrt(dimension);

        //set the numberList
        for (let i=1; i<(dimension+1); i++) {
            numberList.push(i);
        }

        // set board and its sanity tracker
        board = []
        , restartCounter = 0
        , restartCycleCount = 0;

        //set return status
        setStatus();
    }
    , setStatus = function(success,timeTaken,errMsg = null) {
            status.success = success||false;
            status.timeTaken = timeTaken || 0;
            status.errorMsg = errMsg;
            status.board = board;
            status.restartCounter = restartCounter;
            status.dimension = dimension;
            status.maxRestartCycleCount = maxRestartCycleCount;
    }

    , generateBoard = function(options) {
        let start
        , restart
        , validNumList
        , oldRow
        , success = false
        , errMsg = null;
        try {
            setDrivers(options);
            start = new Date().getTime();
            for (let row=0;row<dimension;row++) {
                restart = false;
                board[row]=[];
                iterator.setBlockDisplayForRow(row);
                for (let column=0;column<dimension;column++) {
                    if (iterator.fillColumn(column)) {
                        validNumList = fetchValidNumList(row,column)
                        if (validNumList.length == 0) {
                            throw new Error('errored');
                            restart = true
                            ++restartCounter;
                            ++restartCycleCount;
                            if (restartCycleCount>maxRestartCycleCount) throw new Error("Max restart Count reached!");
                            break;
                        }
                        board[row][column]=validNumList[augMath.randomInt(validNumList.length,1)-1];
                    } else {
                        board[row][column]=0;
                    }
                }
                //something went wrong restart with max restart cycle 10 and then error out
                if (restart) --row;
                if (oldRow !== row) { 
                    //if restarted this counter is incremented to prevent infinite loop,
                    // max consecutive failed restart can be 11 default (11 is an arbitrary number need to find a logical default)
                    //but if restart resolved the row set this counter to 0
                    restartCycleCount = 0;
                }
                oldRow = row;
            }
            success = true;
        } catch (e) {
            errMsg = e.message;
        }
        setStatus(success,new Date().getTime()-start,errMsg);
        return status;
    }
    , isDimensionValid = function(dimension) {
        return true;
    }
    ,fetchValidNumList = function(row,column) {
        let tempNumberList = []
        , numberExist
        , testNumber;
        for (let i=0;i<numberList.length;i++) {
            numberExist = false;
            testNumber = numberList[i];

            //check horizontal row for presence of number
            if (~board[row].indexOf(testNumber)) {
                continue;
            }

            //check vertical for presence of number
            for (let rowIdx=0;rowIdx!=row;rowIdx++) {
                if (board[rowIdx][column] === testNumber) {
                    numberExist = true;
                    break;
                }
            }
            if (numberExist) continue;

            //todo: there appears to be a possibility to improve this
            //check box for presence of number
            let xBox = Math.floor(column/rootNumber);
            let yBox = Math.floor(row/rootNumber);

            for (let rowBox = 0; rowBox<row+1; rowBox++) {
                // console.log('row',rowBox)
                for (let columnBox = 0; columnBox<rootNumber; columnBox++) {
                    let val = (board[((yBox*rootNumber)+rowBox)]&&board[((yBox*rootNumber)+rowBox)][((xBox*rootNumber)+columnBox)])||0;
                    if (val === testNumber) {
                        numberExist = true;
                        break;
                    }
                }
            }
            if (numberExist) continue;

            tempNumberList.push(testNumber)
        }
        return tempNumberList;
    }

    
    exports.generateSudokuBoard = generateBoard;
})();