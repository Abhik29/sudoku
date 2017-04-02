(function(){
    let array = [0,1,2];
    //iterations could be 1,2,3 or 0,-1,-2
    let iterator = function(iterations) {
        if (iterations>3||(iterations<-2)) {
            throw Error ("Iteration should lie between -2 and 3, both inclusive");
        }
        let idx,next;
        if (iterations>0) {
            idx = 0;
           next = function() {  //forwardIterator function
                return (idx<iterations)
                ?{value:array[idx++],done:false}
                : {done:true};
           }
        } else {
            idx = array.length-1;
            iterations = (iterations-1)+idx;
            next = function() { //reverseIterator function
                return (idx>iterations)
                ? {value:array[idx--],done:false}
                : {done:true};
           }
        }
        let getValue = function() {
            return array[idx];
        }
        return {
            next:next,
            getValue:getValue
        };
    }
    let output;
    exports.setBlockDisplayForRow = function(row) {
        let iterations = 3 - Math.floor(row/3)-row%3
        , it = iterator(iterations);
        output = [];
        let itValue = it.next();
        while (!itValue.done) {
            output.push(itValue.value);
            itValue = it.next();
        }
    }

    exports.fillColumn = function(column) {
        return ~output.indexOf(Math.floor(column/3));
    }  
})();