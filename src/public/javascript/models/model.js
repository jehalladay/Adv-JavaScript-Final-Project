
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
        if (localStorage.key(1)==null) {
            this.sb = new Scoreboard;
            this.Q  = new Queue;
            this.deletedQ = new Queue;
            this.completedQ = new Queue;
            this.subjects   = [];
            this.data ={};

            this.storeLocally();
        } else {
            this.sb = new Scoreboard(localStorage.getItem('score'));
            this.Q  = new Queue(localStorage.getItem('queue'));
            this.deletedQ = new Queue(localStorage.getItem('deleted_queue'));
            this.completedQ = new Queue(localStorage.getItem('completed_queue'));
            this.subjects   = (localStorage.getItem('subjects'))
            this.data =(localStorage.getItem('data'))
        }
        this.categories = ['Homework', 'Projects', 'Reading', 'Tests', 'Videos'];

    };

    storeLocally() {
        localStorage.setItem('score', this.sb.score)
        localStorage.setItem('queue', this.Q.queue)
        localStorage.setItem('deleted_queue', this.deletedQ.queue)
        localStorage.setItem('completed_queue', this.completedQ.queue)
        localStorage.setItem('subjects', this.subjects)
        localStorage.setItem('data', this.data)

        return this;
    }


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


