
import {Scoreboard} from "./scoreboard.js";
import {Queue} from "./queue.js";

'use strict'


/**
 * Class stores all of the data for the planner app
 *  contains methods for manipulating the data 
 *  using the scoreboard object in its composition
 *  located in ./scoreboard.js
 */
class Model{
    constructor() {
        if (localStorage.getItem('subjects') == null) {
            this.sb = new Scoreboard;
            this.Q  = new Queue;
            this.deletedQ = new Queue;
            this.completedQ = new Queue;
            this.subjects   = [];
            this.data = {};
        } else {
            this.sb         = new Scoreboard(JSON.parse(localStorage.getItem('score')))
            this.Q          = new Queue(JSON.parse(localStorage.getItem('queue')))
            this.deletedQ   = new Queue(JSON.parse(localStorage.getItem('deleted_queue')))
            this.completedQ = new Queue(JSON.parse(localStorage.getItem('completed_queue')))
            this.subjects   = JSON.parse(localStorage.getItem('subjects'))
            this.data       = JSON.parse(localStorage.getItem('data'))
        }
        this.categories = ['Homework', 'Projects', 'Reading', 'Tests', 'Videos'];
        this.storeLocally()

        return this;
    };

    storeLocally() {
        localStorage.setItem('score', JSON.stringify(this.sb.score))
        localStorage.setItem('queue', JSON.stringify(this.Q.queue))
        localStorage.setItem('deleted_queue', JSON.stringify(this.deletedQ.queue))
        localStorage.setItem('completed_queue', JSON.stringify(this.completedQ.queue))
        localStorage.setItem('subjects', JSON.stringify(this.subjects))
        localStorage.setItem('data', JSON.stringify(this.data))

        return this;
    };

    


    /**
     * function creates a new set of arrays inside the
     *  data object to represent a new subject
     */
    subjectFactory(subject) {
        this.subjects.push(subject)
        this.data[subject] = {
            Homework: [],  
            Projects: [],
            Reading:  [],
            Tests:    [],
            Videos:   []
        };
        
        return this;
    };


    /**
     * function gives a point multiplier that
     *  depends on how soon the todo item is due
     */
    checkMultiplier(dueDate) {
        var output = dueDate === ''? 0: 1;
        if (output = 0) {
            return output 
        };
        var today = Date.parse(new Date);
        var item  = Date.parse(dueDate);
        var difference = (item - today)/3600000;
        if (difference < 6) {
            var output = 2;
        } else if (difference < 12) {
            var output = 1.5;
        };
        return output;
    };
};




export {Model}