/* 
**************************************************************************
Assignment: Project 2 - Planner App
Author: James Halladay
Advanced Programming with JavaScript
Date: 3/30/2020


**************************************************************************

I wanted to build a model view controller to get a better understanding of 
    the design pattern. I had once tried to use Django for python, which uses
    the model-template-view pattern, and was completely lost and overwhelmed.
    Since the MTV pattern is descended from the MVC, and the MVC seems to be 
    a pervasive pattern in the industry so I went about building one instead 
    of a MTV.

The project itself is a planner that adds todo items organized first by custom
    subjects and then by individual todo categories. The user allocates points
    to give weight to larger todo items. When a Todo item is completed, the 
    points are added to a score that is maintained by the Model Class. The
    scoreboard displays totals for points earned both daily and weekly, going
    back 1 week. It also shows the users historic high scores.

The point system allows users to quantitatively measure their productivity in a
    meaningful way, and provides the user with motivation in a game-like fashion.
    A user may strive to cram in as many items as possible to exceed previous 
    scores.

There are 3 classes in this file as well as one IIFE that serves to initialize 
    the classes. 

The Model Class is composed of the Scoreboard class created in the scoreboard.js
    file and controls the data for the planner app.

The View Class imports templates from function stored in the templates.js file
    and controls all changes to the appearance of Planner App through HTML 
    modifications.

The Controller Class is composed of the Model and View Classes and facilitates 
    all interactions between the user and the program


I Think I accomplished most of my goals, but Initially I had planned for the app
    to use server side storage so I could use this for school. The mvc.js itself
    needs refactored to use more loops because of the huge blocks of code that 
    creates HTML selectors are both not aesthetic and just bad code.

I had some problems getting local storage built in after building the app. It seems
    that I need to refactor the Controller Class methods in order to have the app 
    restart with all the Panels active. 
    
I also need to create a set of methods for the Model Class to fetch old data from 
    the server and send data to the server. I would like to do this because it 
    would allow me to rely on the data being present in the case of a browser 
    update that clears the cache or some other incident that results in the 
    browser data being unrecoverable.

**************************************************************************
*/

import {Scoreboard} from "./scoreboard.js";
import {template, queTemplate} from "./templates.js";
import {Queue} from './queue.js';

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
            console.table(this.sb.score)
        };
    }


};





/**
 * Class controls all user interface manipulations
 *  instantiates selectors for the controller to access
 *  and passes data from the UI to the controller
 */
class View {
    constructor() {
        this.que        = {};
        this.needed     = {};
        this.scoreboard = {};
        this.createSubject     = document.querySelector('#create-subject');
        this.subjectControl    = document.querySelector('#control');
        this.subjectCategories = document.querySelector('#add-items') || '';
        this.scoreboard.id     = document.getElementById('score');
        this.que.id            = document.getElementById('que-list'); 
        this.needed.due = 0;
        this.needed.que = 0;
    };


    /**
     * Function constructs the subject list drop down and appends an option for
     *  each subject created by the user
     */
    subjectList(subjects) {
        var displayArea = document.getElementById('subject-subcategories')
        if (subjects.length == 0) {
            while (displayArea.firstChild) {
                displayArea.removeChild(displayArea.firstChild)
            }; 
            return this;
        } else if (!(document.getElementById('subject-list'))) {
            if (!document.getElementById('subject-list-label')) {
                var label = document.createElement('label');
                label.innerText = "Subject: ";
                label.htmlFor = 'subjects';
                label.id = 'subject-list-label';
                displayArea.append(label);
            };

            var list = document.createElement('select');
            list.name = "subjects";
            list.id = 'subject-list';
            displayArea.append(list);
        } else {
            var list = document.getElementById('subject-list');
        };

        while (list.firstChild) {
            list.removeChild(list.firstChild);
        };

        subjects.forEach((x)=>{
            var option = document.createElement("option");
            option.textContent = x;
            option.value = x;
            option.className = x;
            list.append(option);
        });
        
        this.createSubjectItems()
        this.subjectCategories = document.querySelector('#add-items')
        return this;
    };


    /**
     * function creates input fields to add items to 
     *  the que under their subjects and categories
     */
    createSubjectItems() {
        if (document.getElementById('subject-list') && !document.getElementById('add-items')) {
            var displayArea = document.getElementById('subject-subcategories');

            var newDiv = document.createElement('div');
            newDiv.className = "subcategories";
            newDiv.innerHTML = template('subject-panel');
            newDiv.id = 'addToDo';
            displayArea.append(newDiv);
            this.subjectToDo = document.getElementById('addToDo')
            
            var button = document.createElement('button');
            button.id = "add-items";
            button.textContent = 'Submit';
            displayArea.append(button);
        };
        this.categorySelectors();
        return this;
    };


    /**
     * function checks to make sure the input fields on the subject panel
     *  have been properly entered. If not appends a message to guide the
     *  user to the bottom of the panel
     */
    checkToDoInput() {
        var parsedDate = Date.parse(this.dueSelector.value);
        if (isNaN(parsedDate) || this.todoSelector.value == '') {
            if (this.needed.due == 0) {
                var needDue = document.createElement("p");
                needDue.innerText = 'Item and Due Date are required to create new Todo';
                this.subjectToDo.append(needDue);
                this.needed.due = 1;
            };
            return false;
        } else if (this.needed.due == 1) {
            this.needed.due = 0;
            this.subjectToDo.removeChild(this.subjectToDo.lastChild);
        };
        return true;
    };


    /**
     * function constructs each categories cell in the que interface
     *  using the queTemplate from ./templates.js
     */
    constructQue(category) {
        var newQue = document.createElement('div');
        newQue.id = 'que';
        newQue.innerHTML = queTemplate(category);
        this.que.id.append(newQue);
        this.queSelectors();
        return this;
    };


    /**
     * Function creates the scoreboard interface using
     *  the scoreboard template from ./template.js
     */
    constructScoreboard() {
        var sb = document.createElement('div');
        sb.id = "scoreboard";
        sb.innerHTML = template('scoreboard');
        this.scoreboard.id.append(sb);
        this.sbSelectors();
        return this;
    };


    populateQue(data){
        var categories = data.categories;
        var tableData = data.que;


        for (var x of categories) {
            var quePanel = this.que[x]
            if (tableData[x][0]) {
                var queData = tableData[x][0];
                quePanel.due.innerText = "Due Date: " + ` ${queData.due.getMonth() +1}/${queData.due.getDate()}`;
                quePanel.subject.innerText = `${queData.subject}`;
                quePanel.todo.innerText = `${queData.todo}`;
                quePanel.details.innerText = `${queData.details}`;
                quePanel.points.innerText = `${queData.points}`;
                quePanel.multiplier.innerText = `x${data.checkMultiplier(queData.due)}`;
            };
        };
    };
    
    /**
     * Function populates the scoreboard with the 
     *  score stored in the model.sb.score object
     *  passed in from the controller object
     * 
     * NEEDS REFACTORED TO USE LOOPS
     */
    populateSB(score) {
        this.scoreboard.monday.points.innerText    = score.Monday.Points;
        this.scoreboard.tuesday.points.innerText   = score.Tuesday.Points;
        this.scoreboard.wednesday.points.innerText = score.Wednesday.Points;
        this.scoreboard.thursday.points.innerText  = score.Thursday.Points;
        this.scoreboard.friday.points.innerText    = score.Friday.Points;
        this.scoreboard.saturday.points.innerText  = score.Saturday.Points;
        this.scoreboard.sunday.points.innerText    = score.Sunday.Points;
        this.scoreboard.total.points.innerText     = score.Total.Points;
        this.scoreboard.historic.points.innerText  = score['Historic Total'].Points;

        this.scoreboard.monday.lastWeek.innerText     = score.Monday['Last Week'];
        this.scoreboard.tuesday.lastWeek.innerText    = score.Tuesday['Last Week'];
        this.scoreboard.wednesday.lastWeek.innerText  = score.Wednesday['Last Week'];
        this.scoreboard.thursday.lastWeek.innerText   = score.Thursday['Last Week'];
        this.scoreboard.friday.lastWeek.innerText     = score.Friday['Last Week'];
        this.scoreboard.saturday.lastWeek.innerText   = score.Saturday['Last Week'];
        this.scoreboard.sunday.lastWeek.innerText     = score.Sunday['Last Week'];
        this.scoreboard.total.lastWeek.innerText      = score.Total['Last Week'];
        this.scoreboard.historic.lastWeek.innerText   = score['Historic Total']['Last Week'];

        this.scoreboard.monday.historic.innerText     = score.Monday['Historic High'];
        this.scoreboard.tuesday.historic.innerText    = score.Tuesday['Historic High'];
        this.scoreboard.wednesday.historic.innerText  = score.Wednesday['Historic High'];
        this.scoreboard.thursday.historic.innerText   = score.Thursday['Historic High'];
        this.scoreboard.friday.historic.innerText     = score.Friday['Historic High'];
        this.scoreboard.saturday.historic.innerText   = score.Saturday['Historic High'];
        this.scoreboard.sunday.historic.innerText     = score.Sunday['Historic High'];
        this.scoreboard.total.historic.innerText      = score.Total['Historic High'];
        this.scoreboard.historic.historic.innerText   = score['Historic Total']['Historic High'];

        return this;
    };

    cleanQue(category) {
        var que = this.que[category];

        que.due.innerText = "Due Date: ";
        que.subject.innerText = ``;
        que.todo.innerText = `Nothing`;
        que.details.innerText = `None`;
        que.points.innerText = `0`;
        que.multiplier.innerText = `x1`;
    };



    /**
     * Function instantiates selectors for the que
     *  and stores their reference in the view.que object
     * 
     * NEEDS REFACTORED TO USE LOOPS
     */
    queSelectors() {
        this.que.Homework = {};
        this.que.Homework.id         = document.getElementById('homework-que');
        this.que.Homework.due        = document.querySelector('#homework-que .que-due');
        this.que.Homework.todo       = document.querySelector('#homework-que .que-todo');
        this.que.Homework.subject    = document.querySelector('#homework-que .que-subject');
        this.que.Homework.delete     = document.querySelector('#homework-que .delete');
        this.que.Homework.complete   = document.querySelector('#homework-que .complete');
        this.que.Homework.details    = document.querySelector('#homework-que .que-details');
        this.que.Homework.points     = document.querySelector('#homework-que .points');
        this.que.Homework.multiplier = document.querySelector('#homework-que .que-multiplier');
        
        this.que.Projects = {};
        this.que.Projects.id         = document.getElementById('project-que');
        this.que.Projects.due        = document.querySelector('#project-que .que-due');
        this.que.Projects.todo       = document.querySelector('#project-que .que-todo');
        this.que.Projects.subject    = document.querySelector('#project-que .que-subject');
        this.que.Projects.delete     = document.querySelector('#project-que .delete');
        this.que.Projects.complete   = document.querySelector('#project-que .complete');
        this.que.Projects.details    = document.querySelector('#project-que .que-details');
        this.que.Projects.points     = document.querySelector('#project-que .points');
        this.que.Projects.multiplier = document.querySelector('#project-que .que-multiplier');
        
        this.que.Reading = {};
        this.que.Reading.id         = document.getElementById('reading-que');
        this.que.Reading.due        = document.querySelector('#reading-que .que-due');
        this.que.Reading.todo       = document.querySelector('#reading-que .que-todo');
        this.que.Reading.subject    = document.querySelector('#reading-que .que-subject');
        this.que.Reading.delete     = document.querySelector('#reading-que .delete');
        this.que.Reading.complete   = document.querySelector('#reading-que .complete');
        this.que.Reading.details    = document.querySelector('#reading-que .que-details');
        this.que.Reading.points     = document.querySelector('#reading-que .points');
        this.que.Reading.multiplier = document.querySelector('#reading-que .que-multiplier');
        
        this.que.Tests = {};
        this.que.Tests.id         = document.getElementById('test-que');
        this.que.Tests.due        = document.querySelector('#test-que .que-due');
        this.que.Tests.todo       = document.querySelector('#test-que .que-todo');
        this.que.Tests.subject    = document.querySelector('#test-que .que-subject');
        this.que.Tests.delete     = document.querySelector('#test-que .delete');
        this.que.Tests.complete   = document.querySelector('#test-que .complete');
        this.que.Tests.details    = document.querySelector('#test-que .que-details');
        this.que.Tests.points     = document.querySelector('#test-que .points');
        this.que.Tests.multiplier = document.querySelector('#test-que .que-multiplier');
        
        this.que.Videos = {};
        this.que.Videos.id         = document.getElementById('video-que');
        this.que.Videos.due        = document.querySelector('#video-que .que-due');
        this.que.Videos.todo       = document.querySelector('#video-que .que-todo');
        this.que.Videos.subject    = document.querySelector('#video-que .que-subject');
        this.que.Videos.delete     = document.querySelector('#video-que .delete');
        this.que.Videos.complete   = document.querySelector('#video-que .complete');
        this.que.Videos.details    = document.querySelector('#video-que .que-details');
        this.que.Videos.points     = document.querySelector('#video-que .points');
        this.que.Videos.multiplier = document.querySelector('#video-que .que-multiplier');

        return this;
    };


    /**
     * Function instantiates selectors for the scoreboard
     *  and stores their reference in the view.scoreboard object
     * 
     * NEEDS REFACTORED TO USE LOOPS
     */
    sbSelectors() {
        this.scoreboard.monday      = {};
        this.scoreboard.tuesday     = {};
        this.scoreboard.wednesday   = {};    
        this.scoreboard.thursday    = {};    
        this.scoreboard.friday      = {};
        this.scoreboard.saturday    = {};    
        this.scoreboard.sunday      = {};
        this.scoreboard.total       = {};
        this.scoreboard.historic    = {};

        this.scoreboard.monday.id      = document.querySelector('#monday');
        this.scoreboard.tuesday.id     = document.querySelector('#tuesday');
        this.scoreboard.wednesday.id   = document.querySelector('#wednesday');
        this.scoreboard.thursday.id    = document.querySelector('#thursday');
        this.scoreboard.friday.id      = document.querySelector('#friday');
        this.scoreboard.saturday.id    = document.querySelector('#saturday');
        this.scoreboard.sunday.id      = document.querySelector('#sunday');
        this.scoreboard.total.id       = document.querySelector('#totals_row');
        this.scoreboard.historic.id    = document.querySelector('#totals_historic_row');
        
        this.scoreboard.monday.points      = document.querySelector('#monday .points');
        this.scoreboard.tuesday.points     = document.querySelector('#tuesday .points');
        this.scoreboard.wednesday.points   = document.querySelector('#wednesday .points');
        this.scoreboard.thursday.points    = document.querySelector('#thursday .points');
        this.scoreboard.friday.points      = document.querySelector('#friday .points');
        this.scoreboard.saturday.points    = document.querySelector('#saturday .points');
        this.scoreboard.sunday.points      = document.querySelector('#sunday .points');
        this.scoreboard.total.points       = document.querySelector('#totals_row .points');
        this.scoreboard.historic.points    = document.querySelector('#totals_historic_row .points');
        
        this.scoreboard.monday.lastWeek      = document.querySelector('#monday .totals_prev');
        this.scoreboard.tuesday.lastWeek     = document.querySelector('#tuesday .totals_prev');
        this.scoreboard.wednesday.lastWeek   = document.querySelector('#wednesday .totals_prev');
        this.scoreboard.thursday.lastWeek    = document.querySelector('#thursday .totals_prev');
        this.scoreboard.friday.lastWeek      = document.querySelector('#friday .totals_prev');
        this.scoreboard.saturday.lastWeek    = document.querySelector('#saturday .totals_prev');
        this.scoreboard.sunday.lastWeek      = document.querySelector('#sunday .totals_prev');
        this.scoreboard.total.lastWeek       = document.querySelector('#totals_row .totals_prev');
        this.scoreboard.historic.lastWeek    = document.querySelector('#totals_historic_row .totals_prev');
        
        this.scoreboard.monday.historic      = document.querySelector('#monday .totals_historic_column');
        this.scoreboard.tuesday.historic     = document.querySelector('#tuesday .totals_historic_column');
        this.scoreboard.wednesday.historic   = document.querySelector('#wednesday .totals_historic_column');
        this.scoreboard.thursday.historic    = document.querySelector('#thursday .totals_historic_column');
        this.scoreboard.friday.historic      = document.querySelector('#friday .totals_historic_column');
        this.scoreboard.saturday.historic    = document.querySelector('#saturday .totals_historic_column');
        this.scoreboard.sunday.historic      = document.querySelector('#sunday .totals_historic_column');
        this.scoreboard.total.historic       = document.querySelector('#totals_row .totals_historic_column');
        this.scoreboard.historic.historic    = document.querySelector('#totals_historic_row .totals_historic_column');

        return this;
    };


    /**
     * function instantiates selectors for newly created 
     *  dom elements for the controller to access
     */
    categorySelectors() {
        this.subjectSelector  = document.getElementById('subject-list');
        this.categorySelector = document.getElementById('category-list');
        this.todoSelector     = document.getElementById("category-input");
        this.detailSelector   = document.getElementById('category-details');
        this.dueSelector      = document.getElementById('category-due');
        this.pointSelector    = document.getElementById('points-dropdown');
        return this;
    };
};





/**
 * Class controls all user interactions and
 *  is composed of a model and view object
 *  sends user interface manipulations to 
 *      the view object
 *  sends data interactions to the model object
 */
class Controller {
    constructor(model, view) {
        this.model  = model;
        this.view   = view;
        this.needed = {};
        this.needed.ran = 0;
        if (localStorage.key(1)==null) {
            this.watcher();
        } else {
            this.restoreState();
        };


    };


    /**
     * Function initializes event listeners
     */
    watcher() {
        this.controlListener();
        return this;
    };

    saveState() {
        return this;
    };


    restoreState() {
        return this;
    };

    clearState() {
        localStorage.clear()
        return this;
    };


    /**
     * function controls the event listener attached to the submit button
     *  for the Add New Subject area of the Subject Control Panel
     */
    controlListener() {
        console.log('outside listener 1')
        this.view.createSubject.children[1].addEventListener('click', (event) => {
            var subjects = this.model.subjects;
            console.log('inside listener 1')
            var value = this.view.createSubject.children[0].value;
            if (!(subjects.some((x) => x == value)) && value != '') {
                subjects.push(value);
                this.model.subjectFactory(subjects[subjects.length - 1])
            } else {
                this.view.createSubject.children[0].value = '';
            };
            console.log("The subjects array:",subjects);
            this.view.subjectList(subjects);
            this.subjectListener();
        });
        return this;
    };


    /**
     * Function adds an event listener to the Subject Control Panel
     * after its body has been instantiated
     */
    subjectListener() {
        if (this.needed.ran > 0) { 
            return this;
        };
        if (this.view.subjectCategories && this.needed.ran === 0) {
            this.needed.ran = 1;
            this.view.subjectCategories.addEventListener('click', (event) => {
                if (this.needed.ran < 2) {
                    this.view.categorySelectors();
                    this.needed.ran = 2;
                };
                if(!this.view.checkToDoInput()) {
                    return this;
                }

                var parsedDate = Date.parse(this.view.dueSelector.value);
                var date = new Date(parsedDate+21600000);

                this.model.data[this.view.subjectSelector.value][this.view.categorySelector.value].push({
                    subject: this.view.subjectSelector.value,
                    todo:    this.view.todoSelector.value,
                    details: this.view.detailSelector.value,
                    due:     date,
                    points:  this.view.pointSelector.value
                });
                console.log(this.model.data[this.view.subjectSelector.value][this.view.categorySelector.value])
                this.model.queBuilder(this.view.subjectSelector.value, this.view.categorySelector.value);
                
                if (this.view.needed.que == 0) {
                    this.view.needed.que = 1;
                    this.model.categories.forEach((x) => {
                        this.view.constructQue(x);
                    });
                    this.view.constructScoreboard();
                    this.view.populateSB(this.model.sb.score);
                    this.view.populateQue(this.model)
                    this.queListener();
                    
                } else if (this.view.needed.que == 1) {
                    this.view.populateSB(this.model.sb.score);
                    this.view.populateQue(this.model)
                };
            });
        };
    return this;
    };



    queListener() {
        var categories = this.model.categories;

        categories.forEach((x) => {
            var deleteButton = this.view.que[x].delete
            var completeButton = this.view.que[x].complete
            deleteButton.addEventListener('click', (event) => {
                this.model.queHandler(x, 'delete');
                this.view.cleanQue(x);
                this.view.populateQue(this.model);
            });
            completeButton.addEventListener('click', (event) => {
                this.model.queHandler(x, 'complete');
                this.view.cleanQue(x);
                this.view.populateSB(this.model.sb.score);
                this.view.populateQue(this.model);
            });
        });

        return this;
    };
    
};





/**
 * IIFE Function initializes a controller composed with
 *   a model and a view object
 */
;(function() {
    const app = new Controller(new Model, new View);
}());