

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

