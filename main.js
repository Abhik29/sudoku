(function(process){
    

    let sudoku = require('./sudoku_Generator')
    , sudoku2 = require('./sudoku_generator_2')
    , load = process.env.load || 100
    , failedBoards = 0
    , successBoards = 0
    , minTime
    , maxTime
    , totalTime = 0
    , successTime = 0
    , minRestart
    , maxRestart = 0
    , maxTimeRestart = 0
    , start = new Date().getMilliseconds()
    , mode = process.env.mode || '';

    for (let i=0; i<load; i++) {
        let result = process.env.mode==='old'?sudoku.generateSudokuBoard():sudoku2.generateSudokuBoard();
        totalTime += result.timeTaken;
        if (i==0) {
                minTime = result.timeTaken; //sometimes it comes undefined
                maxTime = result.timeTaken;
                minRestart = result.restartCounter;
                maxRestart = result.restartCounter;
        }

        if (result.success) {
            successTime += result.timeTaken; 
            ++successBoards;
                if (result.timeTaken < minTime) {
                    minTime = result.timeTaken;
                }

                if (result.timeTaken > maxTime) {
                    maxTime = result.timeTaken;
                    maxTimeRestart = result.restartCounter;
                }

                if (result.restartCounter < minRestart) {
                    minRestart = result.restartCounter;
                }

                if (result.restartCounter > maxRestart) {
                    maxRestart = result.restartCounter;
                }
            
        } else {
            ++failedBoards
        }
        console.log('\033[2J');
        console.log(`Mode: ${mode==='old'?'Old':'New'}`)
        console.log(`Running test ${i+1}:`);
        console.log(`Time Taken: ${totalTime} ms`,`Load: ${load}`, `Success: ${successBoards}`,`Failed: ${failedBoards}`);
        console.log(`Maximum Time Taken: ${maxTime} ms`,`Minimum Time Taken: ${minTime} ms`,`Sucess Time: ${successTime} ms`,`Average Success Time Taken: ${successTime/successBoards} ms`);
        console.log(`Maximum Restarts: ${maxRestart}`,`Minimum Restarts: ${minRestart}`);
        console.log(`Max Time Restart: ${maxTimeRestart}`);
       console.log(result.board);
    }
    console.log(`Success Rate: ${(successBoards/load)*100} %`);
})(process)