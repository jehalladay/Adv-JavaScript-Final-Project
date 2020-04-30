import {Model} from './mvc/models/model.js';
import {View} from './mvc/views/view.js';
import {Controller} from './mvc/controller/controller.js';

const Planner = new Controller(new Model, new View);