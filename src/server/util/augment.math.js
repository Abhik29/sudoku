(function(exports){
    'use strict';
    exports.math = {
        randomInt:function(max,min){
            if (max<min) {
                throw new Error(`Max range cannot be less than min range! ${max} - ${min}`);
            }
            // if (!((max>0)&&(min>0))) {
            //     throw new Error('Max range and min range cannot be -ve');
            // }
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
    }
})(exports);