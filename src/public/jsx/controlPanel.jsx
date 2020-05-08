class ControlPanel extends React.Component {
    constructor(props) {
        super(props);

        this.clickCreateSubject = this.clickCreateSubject.bind(this);
        this.clickCreateTask = this.clickCreateTask.bind(this);

        this.state = {
            subjects: this.createSubjects(),

        }

        
    }

    createSubjects() {
        return this.props.subjects.length != 0? this.props.subjects: ['default']
    } 

    createQueue(task, subject, due, type, details, link, points) {
        return   {
            "task": task,
            "subject": subject,
            "due": due,
            "type": type,
            "details": details,
            "link": link,
            "points": points
        };
    };
    



    setupOptions() {
        this.types = this.props.categories.map((x)=> {
            if(x[x.length-1] == 's') {
                return x.substring(0, x.length-1)
            } 
            return x
        });

        if(this.props.subjects.length === 0) {
            this.subjectArray = ['default'];
        } else {
            this.subjectArray = this.props.subjects
        };

        return this;
    };

    clickCreateSubject(e) {
        let input = document.getElementById('subject-input').value
        if (input != '' && !this.props.subjects.some((x) => x == input)) {
            this.props.subjects.push(input)
            this.setState({subjects: this.createSubjects()})
            this.props.refresh.storeLocally()
        }

        console.log("refresh", this.props.refresh)
    }

    clickCreateTask(e) {
        console.log('click2', this.state.subjects)
        let dateField = document.getElementById('category-due').value,
            task = document.getElementById('task-input').value,
            subject = document.getElementById('subject-list').value,
            type = document.getElementById('category-list').value,
            details = document.getElementById('detail-input').value,
            link = document.getElementById('link-input').value,
            points = document.getElementById('points-dropdown').value


        if(dateField !== '' && task !== '') {
            let dueDate = new Date(Date.parse(dateField)),
                newQueueItem = this.createQueue(task, subject, dueDate, type, details, link, points)
            
            this.props.mQueue.pushTo('master', newQueueItem)
            console.log('pushing to master')

            this.setState({subjects: this.createSubjects()})
            this.props.refresh.storeLocally()

            console.log(this.props.mQueue)
            this.props.refresh.mQsetState()
        }
        console.log('the props are', this.props)



    }

    render() {
        return (
            <div id="control-panel">
                <div className='title-box row' id='new-subject-title'>
                    <h1 className='col-md-12'>New Subject</h1>
                </div>
                <div id="subject-input-area" className='row'>
                    <input type="text" name='subject' placeholder='Enter a new subject or class' id="subject-input" className='col-md-9'/>
                    <button id='create-subject-button' className='col-md-3 submitButton' onClick={this.clickCreateSubject}>
                        +
                        {/* <i class="material-icons">control_point</i> */}
                    </button>
                </div>
                <div className="row">
                </div>
                <div className="row create-task">
                    <h1 className="title-box col-md-12">Create New Task</h1>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-4 task-header">Task:</div>
                            <div className="col-md-8 input-field">
                                <input type="text" placeholder='Enter Task' id="task-input"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 task-header">Subject:</div>
                            <div className="col-md-8 input-field container-fluid">
                                <select name="subject" id="subject-list" className="w100">
                                        {this.setupOptions().subjectArray.map((x, i)=><option value={x} key={`${x}${i}`}>{x}</option>)}
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 task-header">Due:</div>
                            <div className="col-md-8 input-field">
                                <input type="date" name='category-due' id="category-due"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 task-header">Type:</div>
                            <div className="col-md-8 input-field">
                                <select name="category" id="category-list" className='w100'>
                                {this.types.map((y, j)=><option value={y} key={`${y}${j}`}>{y}</option>)}

                                </select>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 task-header">Details:</div>
                            <div className="col-md-8 input-field">
                                <input type="text" placeholder='Enter Details' id="detail-input"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 task-header">Link:</div>
                            <div className="col-md-8 input-field">
                                <input type="text" placeholder='Enter URL' id="link-input"/>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 task-header">Points:</div>
                            <div className="col-md-8 input-field points-field">
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
                            </div>
                        </div>
                    </div>
                    <button onClick={this.clickCreateTask} id="add-items" className="col-md-3 submitButton">
                        +
                        {/* <i class="material-icons">control_point</i> */}
                    </button>
                    <div className="buffer col-md-12"></div>
                </div>
            </div>
        );
    };
};

export {ControlPanel}