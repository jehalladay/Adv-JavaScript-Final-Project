/* 
**************************************************************************
Assignment
James Halladay
Advanced Programming with JavaScript
Date: 3/30/2020

*/

'use strict'
export {Scoreboard}

/**
 * Object Scoreboard
 * 
 * Object is used to control the Data of the Scoreboard
 *  for the Planner
 * 
 * Methods:
 *      constructor ::  object  -> Scoreboard
 *          instantiates Scoreboard object
 * 
 *      setTotals   ::  void    -> Scoreboard
 *          checks and sets Totals/Historic Total Row
 *              and Historic High Column
 * 
 *      checkDay    ::  str     -> Scoreboard
 *          checks currentDay property against today's date
 *              reassignes currentDay value if different
 *              starts setNextWeek method if different and Monday
 * 
 *      setNewWeek  ::  void    -> Scoreboard
 *          reassignes the values held in the Last Week Column
 *              to the value held in the Points Column
 *              reassignes the Points Column to 0
 *              leaves the Historic Total Points Column untouched
 * 
 *      setPoints   ::  number  -> Scoreboard
 *          accepts a parameter which is then used to increment
 *              the value of the Points Column for the day
 *              that matches the currentDay property
 * 
 *      printScore  ::  void    -> Scoreboard
 *          prints out the score property using a table method from
 *              the console namespace
 * 
 * Methods all return Scoreboard object to allow for Method Chaining
 * 
 * 
 * Properties:
 *      score       ::= The current score held in all rows and columns
 *      weekday     ::= Array containing the Days of the week for lookup
 *      row         ::= Array containing the list of rows in order for lookup
 *      currentDay  ::= Creates new date object and looks up day from weekday
 */
class Scoreboard {

    /**
     *  constructor :: object -> Scoreboard
     * 
     * function instantiates the properties of the Scoreboard object:   
     *      score       ::= The current score held in all rows and columns
     *      weekday     ::= Array containing the Days of the week for lookup
     *      row         ::= Array containing the list of rows in order for lookup
     *      currentDay  ::= Creates new date object and looks up day from weekday
     * 
     * returns Scoreboard to allow for Method Chaining
     */
    constructor(currentScore) {
        console.log('hello from scoreboard')
        this.score = currentScore || {
            "Monday"        : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
            "Tuesday"       : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
            "Wednesday"     : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
            "Thursday"      : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
            "Friday"        : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
            "Saturday"      : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
            "Sunday"        : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
            "Total"         : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
            "Historic Total": {"Points": 0,   "Last Week": 0,   "Historic High": 0}
        };

        this.weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        
        this.rows = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Total", "Historic Total"]
        
        this.currentDay = this.weekday[new Date().getDay()];

        return this;
    };


    /**
     * setTotals :: void -> Scoreboard
     * 
     * Function calculates the values held in the Total Row, The Historic Total Row
     *  and The Historic High Column
     * 
     * returns Scoreboard object to allow method chaining
     */
    setTotals() {
        var score = this.score;

        function highScore(day) {
            day["Historic High"]      = [
                day.Points            , 
                day["Last Week"]      , 
                day["Historic High"]
            ].sort((a, b)=> b - a)[0]
        }


        score.Total.Points = 0
        for (var day of this.weekday) {
            score.Total.Points += score[day].Points;
        };

        score["Historic Total"].Points     = (
            score.Total.Points             + 
            score["Historic Total"]["Last Week"]
        );

        for (var row of this.rows) {
            highScore(score[row]);
        };

        return this;
    };


    /**
     * checkDay :: str -> Scoreboard
     * 
     * Function checks the currentDay property of Scoreboard
     *  and reassigns the correct day.
     * 
     * Takes a test parameter to allow for manually setting 
     *  the day for test purposes
     * 
     * returns Scoreboard to allow method chaining
     */
    checkDay(test) {
        var day = test || this.weekday[new Date().getDay()];

        if (day == this.currentDay) { 
            return this;
        } else if (day == "Monday") {
            this.currentDay = "Monday";
            this.setTotals().setNewWeek();
        } else {
            this.currentDay = day;
        };
        return this;
    };


    /**
     * setNewWeek :: void -> Scoreboard
     * 
     * Function reassigns the values in the Last Week Column to the 
     *  Value held in the Points Column
     * 
     * It then reassigns the values in the Points Column to 0
     * 
     * The Historic Total Row maintains its current Points Value
     * 
     * returns Scoreboard to allow for Method Chaining
     */
    setNewWeek() {
        var score = this.score;
        
        function moveScore(day) {
            day["Last Week"] = day.Points;
            if (day != score["Historic Total"]) {
                day.Points = 0;
            };
        };


        for (var row of this.rows) {
            moveScore(score[row]);
        };

        return this;
    };


    /**
     * setPoints   ::  number  -> Scoreboard 
     *
     * function takes an input value and uses it to increment
     *  the Points column of the row matching currentDay
     * 
     * returns Scoreboard to allow for method chaining
     */
    setPoints(value) {
        var newPoints = value || 0;
        var day = this.checkDay().currentDay;
        this.score[day].Points += newPoints;

        return this;
    }


    /**
     * printScore :: void -> Scoreboard
     * 
     * Function prints out score property of Scoreboard in a 
     *  table format to either the node terminal or browser 
     *  console
     * 
     * returns Scoreboard to allow for Method Chaining
     */
    printScore() { 
        console.table(this.score);
        return this;
    };

};



// (function() {
//     if (typeof window === 'undefined'){
//         if (require.main != module) {
//             exports.Scoreboard = Scoreboard;
//         };
//     };
// }());