'use strict';

export {ViewQueue};
import {queTemplate} from './templates.js';

class ViewQueue {
    constructor(){
        this.categories = ['Homework', 'Projects', 'Reading', 'Tests', 'Videos'];
        this.fields     = ['id', 'due', 'todo', 'subject', 'delete', 'complete', 'details', 'points', 'multiplier']; 
        this.id = document.getElementById('que-list')
        return this;
    };

    
    build() {
        this.categories.forEach((x) => {
            var newQue = document.createElement('div');
            newQue.id = 'que';
            newQue.innerHTML = queTemplate(x);
            this.id.append(newQue);
        });

        return this;
    };
    

    selectors() {
        let ids     = ['#homework-que', '#project-que', '#reading-que', '#test-que', '#video-que'];
        let classes = ['.que-category', '.que-due', '.que-todo', '.que-subject', '.delete', '.complete', '.que-details', '.points', '.que-multiplier'];

        this.categories.forEach((x, i) => {
            this[x] = {};
            this.fields.forEach((y, j) => {
                this[x][y] = document.querySelector(`${ids[i]} ${classes[j]}`)
            });
        });

        return this;
    };


    populate(queue, checkMultiplier) {
        var queue = queue || {Homework: [], Projects: [], Reading: [], Tests: [], Videos: []};

        this.categories.forEach((x) => {
            if (queue[x][0]) {
                this.fields.forEach((y, j) => {
                    if (j == 2 || j == 3 || j == 6 || j == 7 ) {
                        this[x][y].innerText = `${queue[x][0][y]}`;
                    } else if (j == 1) {
                        this[x][y].innerText = `Due Date:  ${queue[x][0][y].getMonth() + 1}/${queue[x][0][y].getDate()}`; 
                    } else if (j == 8) {
                        this[x][y].innerText = `x${checkMultiplier(queue[x][0].due)}`;
                    };
                });
            };
        });
        return this;
    };


    clean(category) {
        this[category].due.innerText        = 'Due Date: ';
        this[category].subject.innerText    = '';
        this[category].todo.innerText       = 'Nothing';
        this[category].details.innerText    = 'None';
        this[category].points.innerText     = '0';
        this[category].multiplier.innerText = 'x0';

        return this;
    };


    listener(queue, queueHandler, checkMultiplier, score, populateSB) {
        this.categories.forEach((x) => {
            var deleteButton   = this[x].delete;
            var completeButton = this[x].complete;
            deleteButton.addEventListener('click', (event) => {
                queueHandler(x, 'delete');
                this.clean(x);
                this.populate(queue, checkMultiplier)
            });
            completeButton.addEventListener('click', (event) => {
                queueHandler(x, 'complete');
                this.clean(x);
                this.populate(queue, checkMultiplier);
                populateSB(score);
            });
        });
        return this;
    };

    // completeButton() {

    //     return this;
    // };
    
    // deleteButton() {

    //     return this;
    // };

    delete() {
        this.id.innerHTML = '';
        
        return this;
    };

};