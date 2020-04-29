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


    currentItems() {
        var upNext = this.categories.map((x)=>{
            return this.queue[x][0];
        });
        return upNext;
    };


    pushTo(category, item) {
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