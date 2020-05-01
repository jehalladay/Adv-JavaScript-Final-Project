'use strict';

export {Queue};

 
class Queue {
    constructor(queue) {
        this.queue = queue || {Homework: [], Projects: [], Reading: [], Tests: [], Videos: []};
        this.categories = Object.keys(this.queue);
    };


    shiftOut(category) {
        if (this.categories.some((x) => x === category)) {
            this.queue[category].shift();
        };
        return this;
    };

    activeCategories() {
        return this.categories.filter((x)=> this.queue[x][0] !== undefined);
        
    }


    currentItems() {
        console.log('state of the queue', this.queue)
        var upNext = this.categories.filter((x)=> this.queue[x][0] !== undefined)
        .map((y) => this.queue[y][0]);
        console.log('state of the queue after filter', upNext)
        return upNext;
    };


    pushTo(category, item) {
        console.log('from queue:: pushTo(category, item):', category, item)
        if (this.categories.some((x) => x === category)) {
            this.queue[category].push(item);
        };
        return this;
    };
    

    peekAt(category) {
        if (this.categories.some((x) => x === category)) {
            return this.queue[category][0];
        };
    };

    sort() {
        this.categories.forEach((x) => {
            this.queue[x].sort((a, b) => {
                if (a['due'] < b['due']) {
                    return -1;
                } else if (a['due'] > b['due']) {
                    return 1;
                } else {
                    return 0;
                };
            });
        });

        return this;
    };
    
    
    printCategory(category) {
        if (this.categories.some((x) => x === category)) {
            console.table(this.queue[category]);
        };
        return this;
    };


    printQueue() {
        console.log(this.queue);
        return this;
    };

};