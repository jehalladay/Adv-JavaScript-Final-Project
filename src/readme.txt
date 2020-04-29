For my project I decided to implement a planner that uses a Model View Controller. 

There are 1 execution path:

    Through the nodeJS server found in the current directory

        Run: npm start 

        then go to 127.0.0.1:1414 in the browser and the app will be server





To Use the planner App:

    The app is fairly simple on the surface
        1. In the Subject control panel, type a Subject and click submit

                subjects for this context are my university classes
                    but I could use any topic I am working on such 
                    as python research or AngularJS

        2. This spawns a new submenu attached to the Subject control panel
            In this submenu, you can add todo items, organize them by subject and category,
                assign a due date, and assign a point value to the todo item
                click the bottom-most submit button to add the todo item to the Todo Que

        3. Once Items are added to the ToDo Que, a que will be spawned from a template in /javascript/templates.js
            The newly spawned que will only show the item that has the nearest due date

                I made this design choice because I frequently have trouble deciding what to do first, with 
                    a que instead of just a list of items, I can cut that out of the decision making process
                    and get to work immediately

        4. A scoreboard is also spawned using a template from /javascript/templates.js that uses 
            the Scoreboard Class from /javascript/scoreboard.js to control its data

                The scoreboard helps motivate the user and provides a history of productivity
                    the goal behind this is to get the user to compare their accomplishments from 
                    the previous days and weeks and pushes them to exceed their last "High Scores"

        5. Any ToDo item that is completed will be erased from the que and have its score added to the  
                scoreboard once the complete button is pressed.
                If the delete button is hit, then the todo item is removed from the que without adding
                    any points to the score



Future Expansion.

        
I wanted to make the planner fully functional so I desinged a server that will potentially handle 
data storage as well as saving the data in a form that is easily exportable, preferrably a JSON file.

The server currently only serves get requests for static files, but I plan to include routing and a 
fake database that manages a JSON file with the planner apps data.

I wrote the server out of pure nodejs in order to fully understand what was going on in a server.
If i fail in implementing data storage for the website, I will probably implement routing using
Express, and it is labeled a dependancy because I was playing around with that option.



I also need to refactor the methods that spawn selectors in the View Class in order to utilize loops instead 
    just 30 lines of imperative code.


I have not yet managed to implement Local or Server storage due to work on the rest of the project to get it
    functional


Another goal would be to clean up the code of the MVC and to more cleanly separate the responsibilities
    that are handled by the Model, View, and Controller Classes respectively.


Most of the heavy html code is handled using templates, but I would like to get more of the HTML document
    in template form and refactor the templates.js file to only export a template namespace with all 
    the template returning functions stored in the template namespace.


Below the Subject Control Panel and Todo Que and the Scoreboard:

I plan on implementing individual lists of tasks
    organized by either subject or category

I would also like to implement a panel that allows users to change que details and to restore deleted items

below the scoreboard I hope to use D3.js to create a graph to visualize user accomplishments

A multiplier for items that are due within 12 hours exists and I would like to expand the functionality to 
    give the very first que item done every day a 2x multiplier in order to motivate the user to start getting something 
    accomplished on the list
