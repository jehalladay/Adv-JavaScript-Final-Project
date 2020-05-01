/*
Templates.js holds large formatted strings that describes
    the layout of various pieces of the apps HTML content

    Needs to be reformatted to use loops
 */

export {template, queTemplate}


function template(stringName) {
    if (stringName == 'subject-panel') {
        var temp = `
        <section>
            <label for="category" id="category-list-label">
                Category: 
            </label>
            <select name="category" id="category-list">
                <option value="Homework">Homework</option>
                <option value="Projects">Projects</option>
                <option value="Reading">Reading</option>
                <option value="Tests">Tests</option>
                <option value="Videos">Videos</option>
            </select>
        </section>
        <section>
            <label for="category-input" id="category-input-label">
                To-Do:
            </label>
            <input type="text" id="category-input" 
            name="category-input" placeholder="Add item to ToDo list">
        </section>
        <section>
            <label for="category-details" id="details-label">
                Details:
            </label>
            <input type="text" id="category-details" 
            name="category-details" placeholder="details...">
        </section>
        <section>
            <label for="category-due" id="due-label">
                Due Date:
            </label>
            <input type="date" id="category-due" 
            name="category-due">
        </section>
        <section>
            <label for="points" id="points-label">
                Points:
            </label>

            <select name="points" id="points-dropdown">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
            </select>
        </section>`;
    } else if (stringName == 'scoreboard') {
        var temp = `
                <table class="table table-dark table-hover">
                    <tr>
                        <th>Day</th>
                        <th>Points</th>
                        <th>Last Week</th>
                        <th>Historic High</th>
                    </tr>
                    
                    <tr id="monday">
                        <th>Mon:</th>
                        <td class="points"></td>
                        <td class="totals_prev"></td>
                        <td class="totals_historic_column"></td>
                        
                    </tr>
                    
                    <tr id="tuesday">
                        <th>Tues:</th>
                        <td class="points"></td>
                        <td class="totals_prev"></td>
                        <td class="totals_historic_column"></td>
                        
                    </tr>
                    <tr id="wednesday">
                        <th>Weds:</th>
                        <td class="points"></td>
                        <td class="totals_prev"></td>
                        <td class="totals_historic_column"></td>
                        
                    </tr>
                    <tr id="thursday">
                        <th>Thurs:</th>
                        <td class="points"></td>
                        <td class="totals_prev"></td>
                        <td class="totals_historic_column"></td>
                        
                    </tr>
                    <tr id="friday">
                        <th>Fri:</th>
                        <td class="points"></td>
                        <td class="totals_prev"></td>
                        <td class="totals_historic_column"></td>
                        
                    </tr>
                    <tr id="saturday">
                        <th>Sat:</th>
                        <td class="points"></td>
                        <td class="totals_prev"></td>
                        <td class="totals_historic_column"></td>
                        
                    </tr>
                    <tr id="sunday">
                        <th>Sun:</th>
                        <td class="points"></td>
                        <td class="totals_prev"></td>
                        <td class="totals_historic_column"></td>
                        
                    </tr>
                    <tr id="totals_row">
                        <th>Total:</th>
                        <td class="points"></td>
                        <td class="totals_prev"></td>
                        <td class="totals_historic_column"></td>
                        
                    </tr>
                    <tr id="totals_historic_row">
                        <th>Historic:</th>
                        <td class="points"></td>
                        <td class="totals_prev"></td>
                        <td class="totals_historic_column"></td>
                    
                    </tr>
                </table>`;

    };
    return temp;
};

function queTemplate(category) {
    var idCreator = {
        'Homework': 'homework-que',
        'Projects': 'project-que',
        'Reading' : 'reading-que',
        'Tests'   : 'test-que',
        'Videos'  : 'video-que'
    };

    var currentID = idCreator[category];

    var temp = `
    <div class="que-category" id=${currentID}>
        <section class="que-head">
            <div class='que-line que-category-head'>${category}</div>
            <div class='que-line que-due'>Due Date:</div>
        </section>
        <div class="que-bar">

            <section class="que-title">
                <div class="que-line que-todo-title">To-Do:</div>
                <div class="que-line que-subject-title">Subject:</div>
                <button class="que-line que-button-right complete">Complete</button>
            </section>
            <section class="que-area .que-contents">
                <div class="que-line que-todo .que-contents">todo</div>
                <div class="que-line que-subject .que-contents">subject</div>
                <button class="que-line que-button-right delete">Delete</button>
            </section>
        </div>
        <section class="que-bar .que-contents">
            <div class="que-line que-details .que-contents">details</div>
            <div class="que-line que-points que-multiplier .que-contents">x1</div>
            <div class="que-line que-points points .que-contents">pts</div>
        </section>
    </div>`;

    return temp;
};