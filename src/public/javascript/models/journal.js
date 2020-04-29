'use strict';

export {Journal};
import { Queue } from './queue.js';

class Journal extends Queue {
    constructor(queue) {
        super(queue);
        return this;
    };

    


};

// console.log('hello world')
// const journal = new Journal({ Homework: [], Projects: [], Reading: ["rtyu"], Tests: ["gfhj"], Videos: ["asdf"] });
// journal.printQueue()
// var p = console.log;


// p(journal.categories)

// journal.categories.forEach((a) => journal.printCategory(a))