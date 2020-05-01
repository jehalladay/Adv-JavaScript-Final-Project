
const Comps = {
    categories: ['Homework', 'Projects', 'Reading', 'Tests', 'Videos'],
    queueIds: {'Homework': 'homework-queue', 'Projects': 'project-queue', 'Reading' : 'reading-queue', 'Tests'   : 'test-queue', 'Videos'  : 'video-queue'},
    

    Ctr: (...elements) => React.createElement(
        'div', 
        {'id': 'control', 'key': 'ctr'},
        React.createElement('p', {'id': 'control-title','key': 'ControlTitle'}, "Control Panel"),
        React.createElement('p', {'id': 'control-subject-label','key': 'NewSubjectLabel'}, "Add New Subject"),
        Comps.CtrSubjectSubmit(),
        ...elements,
    ),
            
    CtrSubjectSubmit: () => React.createElement(
        'div', 
        {'id': 'create-subject','key': 'CreateSubject'},
        React.createElement('input', {type: 'text', name: 'subject', placeholder: 'new subject...', id: 'createSubject', key: 'CreateSubjectField'}),
        React.createElement('button', {id: 'create-subject-button', key: 'CreateSubjectButton'}, 'Submit')
    ),

    CtrFillSubject: (subjects) => React.createElement(
        'div', 
        {'id': 'subject-subcategories','key': 'SubjectSubcategories'}, 
        React.createElement('label', {'htmlFor': 'subjects', id: 'subject-list-label', key: 'SubjectListLabel'}, 'Subject:'),
        React.createElement(
            'select', 
            {name: 'subjects', id: 'subject-list', key: 'SubjectDropDown'},
            subjects.map((x, i) => React.createElement('option', {value: x, className: x, key: 'SubjectOptions'+i}, x))
        ),
        Comps.CtrToDoFields(),
        React.createElement(
            'div',
            {id: 'subject-submit', key: 'EnterToDo'},
            React.createElement('button', {'id': 'add-items','key': 'CreateTodo'}, "Submit")
        )
    ),

    CtrToDoFields: () => React.createElement(
        'div',
        {className: 'subcategories', id: 'addToDo', key: 'SubcategoriesArea'},
        React.createElement(
            'section', 
            {key: 'Section1'},
            React.createElement('label', {htmlFor: 'category', id: 'category-list-label', key: 'CategoryListLabel'}, "Category: "),
            React.createElement(
                'select',
                {name: 'category', id: 'category-list', key: 'CategoryDropDown'},
                Comps.categories.map((x, i) => React.createElement('option', {value: x, key: x + i}, x))
            )
        ),
        React.createElement(
            'section',
            {key: 'Section2'},
            React.createElement('label', {htmlFor: 'category-input', id: 'category-input-label', key: 'CategoryInputLabel'}, 'To-Do: '),
            React.createElement('input', {type: 'text', id: 'category-input', name: 'category-input', placeholder: 'Add item to ToDo list', key: 'InputToDoField'})
        ),
        React.createElement(
            'section',
            {key: 'Section3'},
            React.createElement('label', {htmlFor: 'category-details', id: 'details-label', key: 'CategoryDetailsLabel'}, 'Details: '),
            React.createElement('input', {type: 'text', id: 'category-details', name: 'category-details', placeholder: 'details...', key: 'CategoryDetailsField'})
        ),
        React.createElement(
            'section',
            {key: 'Section4'},
            React.createElement('label', {htmlFor: 'category-due', id: 'due-label', key: 'CategoryDueLabel'}, 'Due Date: '),
            React.createElement('input', {type: 'date', id: 'category-due', name: 'category-due', key: 'CategoryDueField'})
        ),
        React.createElement(
            'section',
            {key: 'Section5'},
            React.createElement('label', {htmlFor: 'points', id: 'points-label', key: 'CategoryPointsLabel'}, 'Points: '),
            React.createElement(
                'select', 
                {id: 'points-dropdown', name: 'points', key: 'CategoryPointsDropDown'},
                ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((x) => React.createElement('option', {value: x, key: `${x}Point`}, x))
            )
        )
    ),

    QueueArea: (queue, checkMultiplier) => {
        var items = queue.activeCategories();
        if (items.length == 0) {
            console.log('item length is 0:', items)
            return;
        };
        return React.createElement(
            'div', 
            {'key': "queue-container", 'id': 'queue', key: 100*Math.random},
            items.map((x) => {
                console.log("from items.map",x, queue.peekAt(x), checkMultiplier(new Date))
                return Comps.QueueSingle(x, queue.peekAt(x), checkMultiplier)
            })
        );
    },

    QueueSingle: (category, queueItem, checkMultiplier) => {
        console.log('queueSingle1', category, queueItem)
        var dueDate = new Date((queueItem['due'].getDate)? queueItem['due']: Date.parse(queueItem['due']))
        console.log('queueSingle2', category, queueItem, dueDate)

        return React.createElement(
            'div',
            {className: 'queue-category', id: Comps.queueIds[category], key: `${category}Queue`},
            React.createElement(
                'section', 
                {className: 'queue-head', key: `${category}QueueSection1`},
                React.createElement('div', {className: 'queue-line queue-category-head', key: `${category}QueueCategoryLabel`}, category),
                React.createElement('div', {className: 'queue-line queue-due', key: `${category}QueueDueDisplay`}, `Due:  ${dueDate.getMonth() + 1}/${dueDate.getDate()}`)
            ),
            React.createElement(
                'div', 
                {className: 'queue-bar', key: `${category}QueueBar1`},
                React.createElement(
                    'section',
                    {className: 'queue-title', key: `${category}QueueSection2`},
                    React.createElement('div', {className: 'queue-line queue-todo-title' , key: `${category}QueueToDoLabel`}, 'To-Do: '),
                    React.createElement('div', {className: 'queue-line queue-subject-title' , key: `${category}QueueSubjectLabel`}, 'Subject: '),
                    React.createElement('button', {className: 'queue-line queue-button-right complete' , key: `${category}QueueCompleteButton`}, 'Complete')
                ),
                React.createElement(
                    'section',
                    {className: 'queue-area queue-contents', key: `${category}QueueSection3`},
                    React.createElement('div', {className: "queue-line queue-todo queue-contents" ,key: `${category}QueueToDoItem`}, queueItem['todo']),
                    React.createElement('div', {className: "queue-line queue-subject queue-contents" ,key: `${category}QueueSubject`}, queueItem['subject']),
                    React.createElement('button', {className: "queue-line queue-button-right delete" ,key: `${category}QueueDeleteButton`}, 'Delete')
                )
            ),
            React.createElement(
                'section', 
                {className: 'queue-bar queue-contents', key: `${category}QueueBar2`},
                React.createElement('div', {className: 'queue-line queue-details queue-contents', key: `${category}QueueDetailsDisplay`}, queueItem['details']),
                React.createElement('div', {className: 'queue-line queue-points queue-multiplier queue-contents', key: `${category}QueueMultDisplay`}, `x${checkMultiplier(dueDate)}`),
                React.createElement('div', {className: 'queue-line queue-points points queue-contents', key: `${category}QueuePointDisplay`}, queueItem['points'])
            )
        )
    },
};




/**
 * Class controls all user interface manipulations
 *  instantiates selectors for the controller to access
 *  and passes data from the UI to the controller
 */
class View {
    constructor() {
        this.state = 0

        
        this.left = document.getElementById('Left_Panel')
        this.middle = document.getElementById('Middle_Panel')
        this.right = document.getElementById('Right_Panel')
        
        return this;
    };


    bindData(model) {
        this.model = model;

        return this;
    }

    setPosition() {
        console.log('state', this.state)
        switch(this.state) {
            case 1:
                this.controlPosition = this.middle;
                this.sbPosition = '';
                this.queuePosition = '';
                break;
            case 2:
                this.controlPosition = this.middle;
                this.sbPosition = '';
                this.queuePosition = '';
                break;
            case 3:
                console.log('from setPosition, state=', this.state)
                this.controlPosition = this.right;
                this.sbPosition = this.middle;
                this.queuePosition = this.left;
                break;
            case 4:
                this.controlPosition = this.left;
                this.sbPosition = this.right;
                this.queuePosition = this.middle;
                break;
        };

        return this;
    };

    update(state) {
        if(this.state !== state) {
            this.state = state;
            this.renderDOM()
        };
    };

    cleanDOM() {
        // this.controlPosition = '';
        // this.queuePosition = '';
        // this.sbPosition = '';
        console.log('Componenet unmounted at left: ', ReactDOM.unmountComponentAtNode(this.left))
        console.log('Componenet unmounted at middle: ', ReactDOM.unmountComponentAtNode(this.middle))
        console.log('Componenet unmounted at right: ', ReactDOM.unmountComponentAtNode(this.right))
        return this;
    };

    renderDOM() {
        this.cleanDOM().setPosition();
        this.cleanDOM().setPosition();
        this.virtualControlPanel()
        this.virtualQueue()
        this.virtualScoreboard()
        
        if(this.controlPosition !== '') { 
            console.log('from renderDOM:', this.controlPanel, this.controlPosition)
            ReactDOM.render(this.controlPanel, this.controlPosition, ()=>console.log('rendered control panel at: ', this.controlPosition.id))
            this.controlSelectors();
        } else;
        
        if(this.queuePosition !== '') { 
            ReactDOM.render(this.queueView, this.queuePosition, ()=>console.log("rendered Que at:", this.queuePosition.id));
            this.queueSelectors();
        };

        if(this.sbPosition !== '') { 
            ReactDOM.render(this.scoreboardView, this.controlPosition);
        };

        return this;
    };

    virtualControlPanel(state) {
        this.state = state || this.state;
        console.log("state from virtualControlPanel: ", this.state)
        if(this.state < 2){
            this.controlPanel = Comps.Ctr() 
        } else {
            console.log('control panel: ', this.controlPanel)    
            this.controlPanel = Comps.Ctr(Comps.CtrFillSubject(this.model.subjects)) 
            console.log('control panel: ', this.controlPanel)  
            
        };
        
        return this;
    };

    virtualQueue() {
        if(this.state > 2) {
            this.queueView = Comps.QueueArea(this.model.Q, this.model.checkMultiplier)
        };

        return this;
    };

    virtualScoreboard() {
        this.scoreboardView = '';

        return this;
    };

    updateControlPanel() {
        if(this.controlPosition !== '') { 
            ReactDOM.render(this.controlPanel, this.controlPosition)
            this.controlSelectors();
        };

        return this;
    };

    updateQueue() {
        if(this.queuePosition !== '') {
            ReactDOM.render(this.queueView, this.queuePosition)
            this.queueSelectors();
        };

        return this;
    }

    controlSelectors() {
        this.newSubjectField = document.getElementById('createSubject')
        this.createSubjectButton = document.getElementById('create-subject-button')
        if(this.state > 1) {
            this.createTodoButton = document.getElementById('add-items'),
            this.createTodo = {},

            this.createTodo.subject  = document.getElementById('subject-list'),
            this.createTodo.category = document.getElementById('category-list'),
            this.createTodo.todo     = document.getElementById("category-input"),
            this.createTodo.detail   = document.getElementById('category-details'),
            this.createTodo.due      = document.getElementById('category-due'),
            this.createTodo.point    = document.getElementById('points-dropdown')
        };
        
        return this;
    };

    queueSelectors() {

        return this;
    };


    
    /**
     * function checks to make sure the input fields on the subject panel
     *  have been properly entered. If not appends a message to guide the
     *  user to the bottom of the panel
     */
    checkToDoInput() {
        var parsedDate = Date.parse(this.createTodo.due.value);
        console.log('date: ',parsedDate)
        console.log('todays date: ',Date.parse(new Date) < parsedDate)
        this.subjectToDo = document.getElementById('addToDo');
        if (isNaN(parsedDate) || this.createTodo.todo.value == '') {
            console.log("childeren", this.subjectToDo.children.length);
            if(this.subjectToDo.children.length == 5) { 
                var needDue = document.createElement("p");
                needDue.innerText = 'valid To-Do and Due Date are required to create a new To-Do item';
                this.subjectToDo.append(needDue);
            };

            return false;
        } else if(this.subjectToDo.children.length > 5) {
            this.subjectToDo.removeChild(this.subjectToDo.lastChild);
        };
        return true;
    };
    


};

export {View}