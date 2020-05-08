class QueueItem extends React.Component {
    constructor(props) {
        super(props);
        this.due = new Date((this.props.item.due.getDate)? this.props.item.due: Date.parse(this.props.item.due))
        this.clickComplete = this.clickComplete.bind(this)
        this.clickDelete = this.clickDelete.bind(this)
    };

    componentDidMount() {
        console.log("in queue item", this.props)
    }

    linkGenerator() {
        if(this.props.item.link) {
            return <a href={this.props.item.link}>{this.props.item.task}</a>
        } else {
            return <h2>{this.props.item.task}</h2>
        }
    }

    clickComplete(e) {
        this.props.parentQueue.shiftIndexOut('master', this.props.num)
        this.props.sb.setPoints(this.props.item.points)
        this.props.refresh.storeLocally()
        this.props.refresh.mQsetState()
        this.props.refresh.sBsetState()
    }

    clickDelete(e) {
        this.props.parentQueue.shiftIndexOut('master', this.props.num)
        this.props.refresh.storeLocally()
        this.props.refresh.mQsetState()
    }

    render() {
        return (
            <div className='queue-item'>
                <div className='row'>
                    <div className='col-md-8 queue-left'>
                        <div className='h100'>
                            <div className='queue-title'>
                                {this.linkGenerator()}
                            </div>
                            <div className='queue-details'>
                                {this.props.item.details}
                            </div>
                        </div>
                    </div>
                    <div className='col-md-2 mid-queue'>
                        <div className='queue-due h25'>
                            Due: {`${this.due.getMonth() + 1}/${this.due.getDate()}`}
                        </div>
                        <div className='queue-subject h25'>
                            {this.props.item.subject}
                        </div>
                        <div className='queue-type h25'> 
                            {this.props.item.type}
                        </div>
                        <div className='queue-points h25'>
                            {this.props.item.points} pts
                        </div>
                    </div>
                    <div className='col-md-2 button-column'>
                        <button className="completeButton w100 h50" onClick={this.clickComplete}>Complete</button>
                        <button className="deleteButton w100 h50" onClick={this.clickDelete}>Delete</button>
                    </div>
                </div>
            </div>
        )
    }

}

export {QueueItem}  