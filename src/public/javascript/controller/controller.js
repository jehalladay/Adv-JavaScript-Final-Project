


/**
 * Class controls all user interactions and
 *  is composed of a model and view object
 *  sends user interface manipulations to 
 *      the view object
 *  sends data interactions to the model object
 */
class Controller {
    constructor(model, view) {
        this.model  = model;
        this.view   = view;
        this.needed = {};
        this.needed.ran = 0;
        if (localStorage.key(1)==null) {
            this.watcher();
        } else {
            this.restoreState();
        };
    };


    /**
     * Function initializes event listeners
     */
    watcher() {
        this.controlListener();
        return this;
    };

    saveState() {
        return this;
    };


    restoreState() {
        return this;
    };

    clearState() {
        localStorage.clear()
        return this;
    };


    /**
     * function controls the event listener attached to the submit button
     *  for the Add New Subject area of the Subject Control Panel
     */
    controlListener() {
        this.view.createSubject.children[1].addEventListener('click', (event) => {
            var subjects = this.model.subjects;
            var value = this.view.createSubject.children[0].value;
            if (!(subjects.some((x) => x == value)) && value != '') {
                subjects.push(value);
                this.model.subjectFactory(subjects[subjects.length - 1])
            } else {
                this.view.createSubject.children[0].value = '';
            };
            console.log("The subjects array:",subjects);
            this.view.subjectList(subjects);
            this.subjectListener();
        });
        return this;
    };


    /**
     * Function adds an event listener to the Subject Control Panel
     * after its body has been instantiated
     */
    subjectListener() {
        if (this.needed.ran > 0) { 
            return this;
        };
        if (this.view.subjectCategories && this.needed.ran === 0) {
            this.needed.ran = 1;
            this.view.subjectCategories.addEventListener('click', (event) => {
                if (this.needed.ran < 2) {
                    this.view.categorySelectors();
                    this.needed.ran = 2;
                };
                if(!this.view.checkToDoInput()) {
                    return this;
                }

                var parsedDate = Date.parse(this.view.dueSelector.value);
                var date = new Date(parsedDate+21600000);

                this.model.data[this.view.subjectSelector.value][this.view.categorySelector.value].push({
                    subject: this.view.subjectSelector.value,
                    todo:    this.view.todoSelector.value,
                    details: this.view.detailSelector.value,
                    due:     date,
                    points:  this.view.pointSelector.value
                });
                console.log(this.model.data[this.view.subjectSelector.value][this.view.categorySelector.value])
                this.model.queBuilder(this.view.subjectSelector.value, this.view.categorySelector.value);
                
                if (this.view.needed.que == 0) {
                    this.view.needed.que = 1;
                    this.model.categories.forEach((x) => {
                        this.view.constructQue(x);
                    });
                    this.view.constructScoreboard();
                    this.view.populateSB(this.model.sb.score);
                    this.view.populateQue(this.model)
                    this.queListener();
                    
                } else if (this.view.needed.que == 1) {
                    this.view.populateSB(this.model.sb.score);
                    this.view.populateQue(this.model)
                };
            });
        };
    return this;
    };



    queListener() {
        var categories = this.model.categories;

        categories.forEach((x) => {
            var deleteButton = this.view.que[x].delete
            var completeButton = this.view.que[x].complete
            deleteButton.addEventListener('click', (event) => {
                this.model.queHandler(x, 'delete');
                this.view.cleanQue(x);
                this.view.populateQue(this.model);
            });
            completeButton.addEventListener('click', (event) => {
                this.model.queHandler(x, 'complete');
                this.view.cleanQue(x);
                this.view.populateSB(this.model.sb.score);
                this.view.populateQue(this.model);
            });
        });

        return this;
    };
    
};


