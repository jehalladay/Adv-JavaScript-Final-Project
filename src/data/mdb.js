/*


Collections:
    user-state: holds the state of the user's page


*/


class MDB {
    constructor() {
        this.mongoose = require("mongoose");
        
        this.url = "mongodb://localhost:27017/planner"
        this.Schema = this.mongoose.Schema
        
        this.mongoose.connect(
            url,
            {
                useUnifiedTopology : true,
                useNewUrlParser    : true
            }
        );
            
        this.mongoose.Promise = global.Promise
        this.db = this.mongoose.connection;


        this.UserSchema = new this.Schema({
            user: {
                type : String, 
                required: true, 
                max: 100
            },

            state   : {
                state: Number, 
                required: true
            },

            score   : {
                score   : {
                    type   : String,
                    default: '{"Monday":{"Points":0,"Last Week":0,"Historic High":0},"Tuesday":{"Points":0,"Last Week":0,"Historic High":0},"Wednesday":{"Points":0,"Last Week":0,"Historic High":0},"Thursday":{"Points":0,"Last Week":0,"Historic High":0},"Friday":{"Points":0,"Last Week":0,"Historic High":0},"Saturday":{"Points":0,"Last Week":0,"Historic High":0},"Sunday":{"Points":0,"Last Week":0,"Historic High":0},"Total":{"Points":0,"Last Week":0,"Historic High":0},"Historic Total":{"Points":0,"Last Week":0,"Historic High":0}}'
                }
            },

            queue: {
                queue: {
                    type: String,
                    default: '{"Homework":[],"Projects":[],"Reading":[],"Tests":[],"Videos":[]}'
                }
            },

            completedQueue: {
                queue: {
                    type: String,
                    default: '{"Homework":[],"Projects":[],"Reading":[],"Tests":[],"Videos":[]}'
                }
            },

            deletedQueue: {
                queue: {
                    type: String,
                    default: '{"Homework":[],"Projects":[],"Reading":[],"Tests":[],"Videos":[]}'
                }
            }
        });

        return this;
    };



}


var mdb = new MDB;





exports.MDB = MDB;