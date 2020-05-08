/* 
**************************************************************************
Assignment
James Halladay
Advanced Programming with JavaScript
Date: 


**************************************************************************
Steps:

**************************************************************************
*/

import {deepEqual} from 'assert';             // If using node v13.2 or above comment out, else uncomment
import {Scoreboard} from "./scoreboard.js"    // If using node v13.2 or above comment out, else uncomment

'use strict'

// const assert = require("assert").strict;


/**
 * deepTester :: (object, object, string, number) -> bool
 * 
 * function compares one object to another while using
 *  the passed in string and number to inform the tester
 *  of the results of the test
 * 
 * returns true if test passes, otherwise returns false
 */
function deepTester(comp, compTo, name, set) {
    try {
        // assert.deepEqual(comp, compTo)   // If using node v13.2 or above comment out, else uncomment
        deepEqual(comp, compTo)             // If not using node v13 or above comment out, else uncomment
        console.log(`\t${name}, Deep Assert ${set}: Passed`);
        return true;
    } catch {
        console.log(`\t\t${name}, Deep Assert ${set}: Failed`);
        return false;
    };
};


/**
 * testScoreboard :: void -> bool
 * 
 * function tests the methods of the class Scoreboard
 * 
 * returns true if all tests pass, otherwise returns false
 */
function testScoreboard() {
    // const sb = require("./scoreboard.js");   // If using node v13.2 or above comment out, else uncomment
    // var testBoard = new sb.Scoreboard;       // If using node v13.2 or above comment out, else uncomment
    var testBoard = new Scoreboard;             // If not using node v13 or above comment out, else uncomment
    var tScore    = testBoard.score;            
    var fPass = true;

    // Comparison values to test against
    var scoreBefore1  = {"Monday":{"Points":30,"Last Week":0,"Historic High":30},"Tuesday":{"Points":30,"Last Week":0,"Historic High":30},"Wednesday":{"Points":30,"Last Week":0,"Historic High":30},"Thursday":{"Points":30,"Last Week":0,"Historic High":30},"Friday":{"Points":30,"Last Week":0,"Historic High":30},"Saturday":{"Points":30,"Last Week":0,"Historic High":30},"Sunday":{"Points":30,"Last Week":0,"Historic High":30},"Total":{"Points":210,"Last Week":0,"Historic High":210},"Historic Total":{"Points":210,"Last Week":0,"Historic High":210}};
    var scoreBefore2  = {"Monday":{"Points":60,"Last Week":0,"Historic High":60},"Tuesday":{"Points":60,"Last Week":0,"Historic High":60},"Wednesday":{"Points":60,"Last Week":0,"Historic High":60},"Thursday":{"Points":60,"Last Week":0,"Historic High":60},"Friday":{"Points":60,"Last Week":0,"Historic High":60},"Saturday":{"Points":60,"Last Week":0,"Historic High":60},"Sunday":{"Points":60,"Last Week":0,"Historic High":60},"Total":{"Points":420,"Last Week":0,"Historic High":420},"Historic Total":{"Points":420,"Last Week":0,"Historic High":420}};
    var scoreAfter1   = {"Monday":{"Points":0,"Last Week":30,"Historic High":30},"Tuesday":{"Points":0,"Last Week":30,"Historic High":30},"Wednesday":{"Points":0,"Last Week":30,"Historic High":30},"Thursday":{"Points":0,"Last Week":30,"Historic High":30},"Friday":{"Points":0,"Last Week":30,"Historic High":30},"Saturday":{"Points":0,"Last Week":30,"Historic High":30},"Sunday":{"Points":0,"Last Week":30,"Historic High":30},"Total":{"Points":0,"Last Week":210,"Historic High":210},"Historic Total":{"Points":210,"Last Week":210,"Historic High":210}};
    var scoreAfter2   = {"Monday":{"Points":0,"Last Week":30,"Historic High":30},"Tuesday":{"Points":0,"Last Week":30,"Historic High":30},"Wednesday":{"Points":0,"Last Week":30,"Historic High":30},"Thursday":{"Points":0,"Last Week":30,"Historic High":30},"Friday":{"Points":0,"Last Week":30,"Historic High":30},"Saturday":{"Points":0,"Last Week":30,"Historic High":30},"Sunday":{"Points":0,"Last Week":30,"Historic High":30},"Total":{"Points":0,"Last Week":210,"Historic High":210},"Historic Total":{"Points":420,"Last Week":420,"Historic High":420}};
    
    // Helper function to increment the value of the testBoard object
    function incrementScore(x) {
        var inc = x || 30;
        
        tScore.Monday.Points    += inc;
        tScore.Tuesday.Points   += inc;
        tScore.Wednesday.Points += inc;
        tScore.Thursday.Points  += inc;
        tScore.Friday.Points    += inc;
        tScore.Saturday.Points  += inc;
        tScore.Sunday.Points    += inc;
    };


    console.log("Testing Scoreboard Class:");
    console.log("\nTesting Scoreboard.setTotals Method:\n");
    
    if (fPass) {
        incrementScore();
        testBoard.setTotals();
        fPass = deepTester(tScore, scoreBefore1, "Scoreboard.setTotals", 1);
    };
    
    if (fPass) {
        incrementScore();
        testBoard.setTotals();
        fPass = deepTester(tScore, scoreBefore2, "Scoreboard.setTotals", 2);
    };

    if (!fPass) {
        return false;
    };

    // var testBoard = new sb.Scoreboard;   // If using node v13.2 or above comment out, else uncomment
    var testBoard = new Scoreboard;         // If not using node v13 or above comment out, else uncomment
    var tScore    = testBoard.score;

    console.log("\nTesting Scoreboard.setNextWeek Method:\n");
    
    if (fPass) {
        incrementScore();
        testBoard.setTotals().setNewWeek();
        fPass = deepTester(tScore, scoreAfter1, "Scoreboard.setNextWeek", 1);
    };

    if (fPass) {
        incrementScore();
        testBoard.setTotals().setNewWeek();
        fPass = deepTester(tScore, scoreAfter2, "Scoreboard.setNextWeek", 2);
    };
    
    if (!fPass) {
        return false;
    };

    console.log("\nTesting Scoreboard.checkDay Method:\n");
    
    // var testBoard = new sb.Scoreboard;   // If using node v13.2 or above comment out, else uncomment
    var testBoard = new Scoreboard;         // If not using node v13 or above comment out, else uncomment
    var tScore    = testBoard.score;
    var date = testBoard.weekday[new Date().getDay()]
    
    if (fPass) {
        fPass = deepTester(testBoard.currentDay, date, "Scoreboard.checkDay", 1)
    };

    if (fPass) {
        date = "Thursday";
        testBoard.checkDay("Thursday");
        fPass = deepTester(testBoard.currentDay, date, "Scoreboard.checkDay", 2)
    };   
    
    if (fPass) {
        testBoard.checkDay("Wednesday");
        fPass = deepTester(testBoard.currentDay, "Wednesday", "Scoreboard.checkDay", 3)
    };   
    
    if (fPass) {
        incrementScore();
        testBoard.checkDay("Monday");
        fPass = deepTester(tScore, scoreAfter1, "Scoreboard.checkDay", 4);
    };    

    if (fPass) {
        incrementScore();
        testBoard.checkDay("Sunday");
        testBoard.checkDay("Monday");
        fPass = deepTester(tScore, scoreAfter2, "Scoreboard.checkDay", 5);
    };    


    return fPass;
};


/**
 * testRunner :: (Function, string) -> Bool
 *  
 * Function runs the passed in function and informs the 
 *  tester of the results test.
 * 
 * returns true if the Function passed in returns true
 *      otherwise returns false
 */
function testRunner(testFunc, name) {
    if (testFunc()) {
        console.log(`\nTests on ${name}: Passed\n`);
        return true;
    } else {
        console.log(`\n\tTests on ${name}: Failed\n`);
        return false;
    };
};


/**
 * unitTest :: void -> void
 * 
 * Function executes unit tests on classes, methods, and functions
 */
function unitTest() {
    var pass  = true;
    
    if (pass) {
        pass = testRunner(testScoreboard, "Scoreboard");
    }

    if (pass) {
        console.log("All test cases passed");
    } else {
        console.log("TEST FAILED!!");
    };
};


/**
 * launch :: void -> void
 * 
 * Function checks if it is being run natively with the test argument
 *  if test argument is given it runs the tests
 */
;(function launch() {
    // if (require.main == module) {    // If using node v13 comment out, else uncomment
        if (process.argv.length > 2 && process.argv[2] == 'test') {
            unitTest();
        };
    // };                              // If using node v13 comment out, else uncomment 
}());