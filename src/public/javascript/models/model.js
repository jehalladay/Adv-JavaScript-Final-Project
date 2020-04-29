
import {Scoreboard} from "./models/scoreboard.js";
import {template, queTemplate} from "./views/templates.js";

'use strict'


/**
 * Class stores all of the data for the planner app
 *  contains methods for manipulating the data 
 *  using the scoreboard object in its composition
 *  located in ./scoreboard.js
 */
class Model{
    constructor() {
        this.sb = new Scoreboard;
        this.subjects   = [];
        this.categories = ['Homework', 'Projects', 'Reading', 'Tests', 'Videos'];
        this.data ={};
        this.que = {Homework: [], Projects: [], Reading: [], Tests: [], Videos: []};
        this.completedQue = {Homework: [], Projects: [], Reading: [], Tests: [], Videos: []};
        this.deletedQue = {Homework: [], Projects: [], Reading: [], Tests: [], Videos: []};
    };


    /**
     * function creates a new set of arrays inside the
     *  data object to represent a new subject
     */
    subjectFactory(subject) {
        return this.data[subject] = {
            Homework: [],  
            Projects: [],
            Reading:  [],
            Tests:    [],
            Videos:   []
        };
    };


    /**
     * Function adds new todo item to the Ques and
     *  sorts them by due date
     */
    queBuilder(subject, category) {
        var incoming = this.data[subject][category];
        var newItem = incoming[incoming.length - 1];
        var section = this.que[category];
        section.push(newItem);
        section.sort((a, b) => {
            if (a['due'] < b['due']) {
                return -1;
            } else if (a['due'] > b['due']) {
                return 1;
            } else {
                return 0;
            };
        });
        console.log(section);
        return this;
    };


    /**
     * function gives a point multiplier that
     *  depends on how soon the todo item is due
     */
    checkMultiplier(dueDate) {
        var today = Date.parse(new Date);
        var item  = Date.parse(dueDate);
        var difference = (item - today)/3600000;
        if (difference < 6) {
            return 2;
        } else if (difference < 12) {
            return 1.5;
        } else {
            return 1;
        };
    };


    queHandler(category, action) {
        var data = this.que[category].shift();
        if (action == 'delete') {
            console.log("deleted")
            this.deletedQue[category].push(data);
            
        } else if (action == 'complete') {
            this.completedQue[category].push(data);
            var points = parseInt(data.points) * this.checkMultiplier(data.due);
            this.sb.setPoints(points);
            console.table(this.sb.score);
        };
    }


};


