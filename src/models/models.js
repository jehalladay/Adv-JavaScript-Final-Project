var score = {
    "Monday"        : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
    "Tuesday"       : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
    "Wednesday"     : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
    "Thursday"      : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
    "Friday"        : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
    "Saturday"      : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
    "Sunday"        : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
    "Total"         : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
    "Historic Total": {"Points": 0,   "Last Week": 0,   "Historic High": 0}
};

var queue = {
    Homework: [], 
    Projects: [], 
    Reading: [], 
    Tests: [], 
    Videos: []
};

var completedQueue = {
    Homework: [], 
    Projects: [], 
    Reading: [], 
    Tests: [], 
    Videos: []
};

var deletedQueue = {
    Homework: [], 
    Projects: [], 
    Reading: [], 
    Tests: [], 
    Videos: []
};
const mongoose=require('mongoose');