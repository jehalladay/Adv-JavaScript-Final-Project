


/**
 * Class controls all user interactions and
 *  is composed of a model and view object
 *  sends user interface manipulations to 
 *      the view object
 *  sends data interactions to the model object
 */
class Controller {
    constructor(model, view) {        
        this.model = model;
        this.view = view;

        // Get state from local storage
        if (localStorage.getItem('planner_state')==null) {
            this.state = 1;
        } else {
            this.state = localStorage.getItem('planner_state');
        };
        this.restoreState();


        return this;
    };

    restoreState() {
        this.view.bindData(this.model);
        this.view.update(this.state);
        this.updateListeners();

        return this;
    };

    storeLocally() {
        localStorage.setItem('planner_state', this.state);
    };

    subjectListener(button, fieldElement) {
        if (this.subjectButtonListener) {
            delete this.subjectButtonListener
        };

        
        this.subjectButtonListener = button.addEventListener('click', (event)=>{
            let field = fieldElement.value;
            if(
                field != ''
                && !this.model.subjects.some((x) => x == field)
            ) {
                console.log('success: subject was created')
                this.model.subjectFactory(field)
                if(this.state < 2) {
                    this.state = 2
                    this.view.virtualControlPanel(2)
                             .updateControlPanel();
                    this.updateListeners();
                    this.toDoListener(this.view.createTodoButton, this.view.createTodo);
                    
                    
                } else {
                    this.view.virtualControlPanel()
                             .updateControlPanel();
                    this.updateListeners();
                };
            } else { 
                
                console.log('failure: input was not accepted');
            }
        });

        return this;
    };

    toDoListener(button, fields) {
        if(this.toDoButtonListener) {
            delete this.toDoButtonListener;
        };

        this.toDoButtonListener = button.addEventListener('click', (event) => {
            console.log('hello from todoListener')
            if(this.view.checkToDoInput()) {

                var parsedDate = Date.parse(this.view.createTodo.due.value);
                var date = new Date(parsedDate+21600000);
                var item = {
                    subject: this.view.createTodo.subject.value,
                    todo:    this.view.createTodo.todo.value,
                    details: this.view.createTodo.detail.value,
                    due:     date,
                    points:  this.view.createTodo.point.value
                };

                this.model.data[this.view.createTodo.subject.value][this.view.createTodo.category.value].push(item);
                this.model.Q.pushTo(this.view.createTodo.category.value, item)
                            .sort();
                
                if(this.state < 3) {
                    this.state = 3;
                    this.view.update(3);
                    this.updateListeners();
                } else {
                    this.view.virtualQueue()
                             .updateQueue();
                };
            } else {
                console.log("input fields needed to create todo item");
            };

        })
        
        return this;
    };


    updateListeners() {
        var state = this.state;
        if(state == 1) {
            if(this.subjectButtonListener) {
                delete this.subjectButtonListener;
            };
            this.subjectListener(this.view.createSubjectButton, this.view.newSubjectField);
        } else if (state == 2) {
            if(this.subjectButtonListener) {
                delete this.subjectButtonListener;
            };
            
            if(this.toDoButtonListener) {
                delete this.toDoButtonListener;
            };

            this.subjectListener(this.view.createSubjectButton, this.view.newSubjectField);
            this.toDoListener(this.view.createTodoButton, this.view.createTodo);
        } else if (state == 3) {
            if(this.subjectButtonListener) {
                delete this.subjectButtonListener;
            };
            
            if(this.toDoButtonListener) {
                delete this.toDoButtonListener;
            };

            this.subjectListener(this.view.createSubjectButton, this.view.newSubjectField);
            this.toDoListener(this.view.createTodoButton, this.view.createTodo);
        } else if (state == 4) {
            if(this.subjectButtonListener) {
                delete this.subjectButtonListener;
            };
            
            if(this.toDoButtonListener) {
                delete this.toDoButtonListener;
            };

            this.subjectListener(this.view.createSubjectButton, this.view.newSubjectField);
            this.toDoListener(this.view.createTodoButton, this.view.createTodo);
        };

        return this;
    }



};


export {Controller}



