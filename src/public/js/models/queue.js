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

    shiftIndexOut(category, index) {
        this.queue[category].splice(index, 1);

        return this;
    }

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

    
    createTestQueue() {
        this.queue = {
            "Homework": [
                {
                    "task": "hw1",
                    "subject": "mechanics",
                    "due": new Date(Date.parse("2020-05-24T06:00:00.000Z")),
                    "category": '',
                    "details": "",
                    "link": "",
                    "points": 1
                }
            ],
            "Projects": [
            ],
            "Reading": [
            ],
            "Tests": [
            ],
            "Videos": [
            ]
        };

        return this;
    }

    createTestMQueue() {
        this.queue = {
            master: [
                {
                    "task": "First Assignment",
                    "subject": "mechanics",
                    "due": new Date(Date.parse("2020-05-24T06:00:00.000Z")),
                    "type": 'Homework',
                    "details": "The first assignment for my Mechanics class",
                    "link": "http://www.google.com",
                    "points": 5
                }
            ]
        };

        return this;
    }

};