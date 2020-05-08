
import {Scoreboard} from "./models/scoreboard.js";
import {Queue} from "./models/queue.js";

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
            this.queue  = new Queue;
            this.deletedQueue = new Queue;
            this.completedQueue = new Queue;
            this.masterQueue = new Queue({master: []})
            this.subjects   = [];
        } else {
            this.sb         = new Scoreboard(JSON.parse(localStorage.getItem('score')))
            this.queue          = new Queue(JSON.parse(localStorage.getItem('queue')))
            this.deletedQueue   = new Queue(JSON.parse(localStorage.getItem('deleted_queue')))
            this.completedQueue = new Queue(JSON.parse(localStorage.getItem('completed_queue')))
            this.masterQueue = new Queue(JSON.parse(localStorage.getItem('master_queue')))
            this.subjects   = JSON.parse(localStorage.getItem('subjects'))
        };
        this.categories = ['Homework', 'Projects', 'Reading', 'Tests', 'Videos'];
        this.storeLocally();

        this.refresh = {}
        this.refresh.storeLocally = this.storeLocally.bind(this)

        return this;
    };

    storeLocally() {
        localStorage.setItem('score', JSON.stringify(this.sb.score))
        localStorage.setItem('queue', JSON.stringify(this.queue.queue))
        localStorage.setItem('deleted_queue', JSON.stringify(this.deletedQueue.queue))
        localStorage.setItem('completed_queue', JSON.stringify(this.completedQueue.queue))
        localStorage.setItem('master_queue', JSON.stringify(this.masterQueue.queue))
        localStorage.setItem('subjects', JSON.stringify(this.subjects))

        return this;
    };




};




export {Model}