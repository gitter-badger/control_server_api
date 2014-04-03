/*
 * api.js - This file manages the execution of gpio headers
 */

/* jslint   node  : true , continue : true,
 devel         : true , indent   : 2,    maxerr   : 50,
 newcap        : true , nomen    : true, plusplus : true,
 regexp        : true , sloppy   : true, vars     : false
 */

//--------------define module scope variables---------------------------
'use strict';
var
    gpio = require('pi-gpio'); //gives access to low-level physical gpio pins

//--------------end module scope variables------------------------------

//--------------begin server configuration------------------------------
module.exports = (function() {
    var
        welcome = "Welcome! This is GPIO control center." +
                          "Begin commanding" +" the define API.",
        pinHolder = [11,12,13,15,16,18,22], //predined safe working gpio headers to use
        validProperties = {
            pin_no: /^[0-9]{2}$/,
            direction: ['output','input']
        },
        logBadParameters = [ ],
        validateParameters,
        triggerPin,
        pinlist = {
            pin17: 11,
            pin18: 12,
            pin21: 13,
            pin22: 15,
            pin23: 16,
            pin24: 18,
            pin25: 22
        },
        report; //variable used to fill in result of action performed

    validateParameters = function(pin_no, direction) {
        var flagparameters = true;

        if(validProperties.pin_no.test(pin_no) === false){
            logBadParameters.push(pin_no);
            flagparameters = false;
        }

        if((pinHolder.indexOf(pin_no)+1) === -1){
            logBadParameters.push(pin_no);
            flagparameters = false;
        }


        if(!((direction === validProperties.direction[0]) ||
            (direction === validProperties.direction[1])
            )) {
            logBadParameters.push(direction);
            flagparameters = false;
        }

        return flagparameters;
    };

    triggerPin = function(pin, direction, value) {
        if(validateParameters(pin, direction)) {

            // use gpio module and trigger the pin
            gpio.open(pin, direction, function(err){
                gpio.write(pin, value, function(){
                    gpio.close(pin);
                });
            });

            //report the result in object literal
            report = {
                message: "success",
                pin : pin,
                direction: direction,
                state: value
            };

        }
        else {
            report = {
              message: "failed",
              badparameters: logBadParameters
            };
        }
        return report;
    };

    return {
        greet: welcome,
        triggerPin: triggerPin,
        pinlist: pinlist,
        pinHolder: pinHolder
    };
}());

//--------------end server configuration--------------------------------