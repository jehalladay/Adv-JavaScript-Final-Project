// const React = require('react')
// const ReactDOM = require('react-dom')
import {Planner} from './views/planner.js';
import {Model} from './model.js';





class View {
    render(props)  {
        ReactDOM.render(React.createElement(Planner, props), document.getElementById('root'));

        return this;
    };
};

class Controller {
    constructor(model, view) {
        this.model = model;
        this.view = view;
        this.view.render(this.model);
    };

};

;(
    function launch(){
        const planner = new Controller(new Model, new View);
    }    
());