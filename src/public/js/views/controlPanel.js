class ControlPanel extends React.Component {
    constructor(props) {
        super(props);

        this.clickCreateSubject = this.clickCreateSubject.bind(this);
        this.clickCreateTask = this.clickCreateTask.bind(this);

        this.state = {
            subjects: this.createSubjects()

        };
    }

    createSubjects() {
        return this.props.subjects.length != 0 ? this.props.subjects : ['default'];
    }

    createQueue(task, subject, due, type, details, link, points) {
        return {
            "task": task,
            "subject": subject,
            "due": due,
            "type": type,
            "details": details,
            "link": link,
            "points": points
        };
    }

    setupOptions() {
        this.types = this.props.categories.map(x => {
            if (x[x.length - 1] == 's') {
                return x.substring(0, x.length - 1);
            }
            return x;
        });

        if (this.props.subjects.length === 0) {
            this.subjectArray = ['default'];
        } else {
            this.subjectArray = this.props.subjects;
        };

        return this;
    }

    clickCreateSubject(e) {
        let input = document.getElementById('subject-input').value;
        if (input != '' && !this.props.subjects.some(x => x == input)) {
            this.props.subjects.push(input);
            this.setState({ subjects: this.createSubjects() });
            this.props.refresh.storeLocally();
        }

        console.log("refresh", this.props.refresh);
    }

    clickCreateTask(e) {
        console.log('click2', this.state.subjects);
        let dateField = document.getElementById('category-due').value,
            task = document.getElementById('task-input').value,
            subject = document.getElementById('subject-list').value,
            type = document.getElementById('category-list').value,
            details = document.getElementById('detail-input').value,
            link = document.getElementById('link-input').value,
            points = document.getElementById('points-dropdown').value;

        if (dateField !== '' && task !== '') {
            let dueDate = new Date(Date.parse(dateField)),
                newQueueItem = this.createQueue(task, subject, dueDate, type, details, link, points);

            this.props.mQueue.pushTo('master', newQueueItem).sort();
            console.log('pushing to master');

            this.setState({ subjects: this.createSubjects() });
            this.props.refresh.storeLocally();

            console.log(this.props.mQueue);
            this.props.refresh.mQsetState();
        }
        console.log('the props are', this.props);
    }

    render() {
        return React.createElement(
            "div",
            { id: "control-panel" },
            React.createElement(
                "div",
                { className: "title-box row", id: "new-subject-title" },
                React.createElement(
                    "h1",
                    { className: "col-md-12" },
                    "New Subject"
                )
            ),
            React.createElement(
                "div",
                { id: "subject-input-area", className: "row" },
                React.createElement("input", { type: "text", name: "subject", placeholder: "Enter a new subject or class", id: "subject-input", className: "col-md-9" }),
                React.createElement(
                    "button",
                    { id: "create-subject-button", className: "col-md-3 submitButton", onClick: this.clickCreateSubject },
                    "+"
                )
            ),
            React.createElement("div", { className: "row" }),
            React.createElement(
                "div",
                { className: "row create-task" },
                React.createElement(
                    "h1",
                    { className: "title-box col-md-12" },
                    "Create New Task"
                ),
                React.createElement(
                    "div",
                    { className: "col-md-9" },
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-md-4 task-header" },
                            "Task:"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-8 input-field" },
                            React.createElement("input", { type: "text", placeholder: "Enter Task", id: "task-input" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-md-4 task-header" },
                            "Subject:"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-8 input-field container-fluid" },
                            React.createElement(
                                "select",
                                { name: "subject", id: "subject-list", className: "w100" },
                                this.setupOptions().subjectArray.map((x, i) => React.createElement(
                                    "option",
                                    { value: x, key: `${x}${i}` },
                                    x
                                ))
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-md-4 task-header" },
                            "Due:"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-8 input-field" },
                            React.createElement("input", { type: "date", name: "category-due", id: "category-due" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-md-4 task-header" },
                            "Type:"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-8 input-field" },
                            React.createElement(
                                "select",
                                { name: "category", id: "category-list", className: "w100" },
                                this.types.map((y, j) => React.createElement(
                                    "option",
                                    { value: y, key: `${y}${j}` },
                                    y
                                ))
                            )
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-md-4 task-header" },
                            "Details:"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-8 input-field" },
                            React.createElement("input", { type: "text", placeholder: "Enter Details", id: "detail-input" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-md-4 task-header" },
                            "Link:"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-8 input-field" },
                            React.createElement("input", { type: "text", placeholder: "Enter URL", id: "link-input" })
                        )
                    ),
                    React.createElement(
                        "div",
                        { className: "row" },
                        React.createElement(
                            "div",
                            { className: "col-md-4 task-header" },
                            "Points:"
                        ),
                        React.createElement(
                            "div",
                            { className: "col-md-8 input-field points-field" },
                            React.createElement(
                                "select",
                                { name: "points", id: "points-dropdown" },
                                React.createElement(
                                    "option",
                                    { value: "1" },
                                    "1"
                                ),
                                React.createElement(
                                    "option",
                                    { value: "2" },
                                    "2"
                                ),
                                React.createElement(
                                    "option",
                                    { value: "3" },
                                    "3"
                                ),
                                React.createElement(
                                    "option",
                                    { value: "4" },
                                    "4"
                                ),
                                React.createElement(
                                    "option",
                                    { value: "5" },
                                    "5"
                                ),
                                React.createElement(
                                    "option",
                                    { value: "6" },
                                    "6"
                                ),
                                React.createElement(
                                    "option",
                                    { value: "7" },
                                    "7"
                                ),
                                React.createElement(
                                    "option",
                                    { value: "8" },
                                    "8"
                                ),
                                React.createElement(
                                    "option",
                                    { value: "9" },
                                    "9"
                                ),
                                React.createElement(
                                    "option",
                                    { value: "10" },
                                    "10"
                                )
                            )
                        )
                    )
                ),
                React.createElement(
                    "button",
                    { onClick: this.clickCreateTask, id: "add-items", className: "col-md-3 submitButton" },
                    "+"
                ),
                React.createElement("div", { className: "buffer col-md-12" })
            )
        );
    }
};

export { ControlPanel };