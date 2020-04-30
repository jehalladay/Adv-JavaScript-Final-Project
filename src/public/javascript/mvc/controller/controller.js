


/**
 * Class controls all user interactions and
 *  is composed of a model and view object
 *  sends user interface manipulations to 
 *      the view object
 *  sends data interactions to the model object
 */
class Controller {
    constructor(model, view) {

        // Get state from local storage
        if (localStorage.key(1)==null) {
            this.state = 0;
            localStorage.setItem('planner_state', 0)
        } else {
            this.state = localStorage.getItem('planner_state')
        };
        return this;
    };


};


