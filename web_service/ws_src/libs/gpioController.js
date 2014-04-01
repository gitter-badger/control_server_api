/*
 * gpioControlller.js - This file manages the execution of gpio headers
 */

/* jslint   node  : true , continue : true,
 devel         : true , indent   : 2,    maxerr   : 50,
 newcap        : true , nomen    : true, plusplus : true,
 regexp        : true , sloppy   : true, vars     : false
 */

//--------------define module scope variables---------------------------
'use strict';
 //gpio = require('pi-gpio'); //gives access to low-level physical gpio pins

//--------------end module scope variables------------------------------

//--------------begin server configuration------------------------------
module.exports = (function() {
   var
       pinHolder = [17,18,21,22,23,24,25], //predined safe working gpio headers to use
       validProperties = {
         pin_no: /^[0-9]{2}$/,
         direction: ['out','in'],
         value: [0,1]
       },
       logBadParameters = {},
       validateParameters,
       message="", // reports the result of action performed
       status=0, // reports the pin state
       triggerPin;

   validateParameters = function(pin_no, direction, value) {
           if(!(validProperties.pin_no.test(pin_no) && (pinHolder.indexOf(pin_no+1)))
               ){
               logBadParameters.pin = pin_no;
               return false;
           }


        if(!((direction === validProperties.direction[0]) ||
            (direction === validProperties.direction[1])
            )) {
            logBadParameters.direction = direction;
            return false;
        }
        if(!((value === validProperties.value[0]) ||
            (value === validProperties.value[1])
            )) {
            logBadParameters.value = value;
            return false;
        }

        return true;
   };

   triggerPin = function(pin_no, direction, value) {
        if(validateParameters(pin_no,
                           direction,
                           value)) {
            // use gpio module and trigger the pin
            message = "success";
            status = 1;
        }
       else {
            message = "bad parameters:" + (logBadParameters.pin || logBadParameters.direction || logBadParameters.value);
            status = 0;
            return {message: message, status: "invalid"};
        }
       return {message: message,
                logic: value,
                status: "valid"
       };
   };

   return {
        valid: validateParameters,
        triggerPin: triggerPin,
        pins: pinHolder
    };
}());

//--------------end server configuration--------------------------------