class QueueItem extends React.Component {
    constructor(props) {
        super(props);
        this.due = new Date(this.props.item.due.getDate ? this.props.item.due : Date.parse(this.props.item.due));
        this.clickComplete = this.clickComplete.bind(this);
        this.clickDelete = this.clickDelete.bind(this);
    }

    componentDidMount() {
        console.log("in queue item", this.props);
    }

    linkGenerator() {
        if (this.props.item.link) {
            return React.createElement(
                'a',
                { href: this.props.item.link },
                this.props.item.task
            );
        } else {
            return React.createElement(
                'h2',
                null,
                this.props.item.task
            );
        }
    }

    clickComplete(e) {
        this.props.parentQueue.shiftIndexOut('master', this.props.num);
        this.props.sb.setPoints(this.props.item.points);
        this.props.refresh.storeLocally();
        this.props.refresh.mQsetState();
        this.props.refresh.sBsetState();
    }

    clickDelete(e) {
        this.props.parentQueue.shiftIndexOut('master', this.props.num);
        this.props.refresh.storeLocally();
        this.props.refresh.mQsetState();
    }

    render() {
        return React.createElement(
            'div',
            { className: 'queue-item' },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-8 queue-left' },
                    React.createElement(
                        'div',
                        { className: 'h100' },
                        React.createElement(
                            'div',
                            { className: 'queue-title' },
                            this.linkGenerator()
                        ),
                        React.createElement(
                            'div',
                            { className: 'queue-details' },
                            this.props.item.details
                        )
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-2 mid-queue' },
                    React.createElement(
                        'div',
                        { className: 'queue-due h25' },
                        'Due: ',
                        `${this.due.getMonth() + 1}/${this.due.getDate()}`
                    ),
                    React.createElement(
                        'div',
                        { className: 'queue-subject h25' },
                        this.props.item.subject
                    ),
                    React.createElement(
                        'div',
                        { className: 'queue-type h25' },
                        this.props.item.type
                    ),
                    React.createElement(
                        'div',
                        { className: 'queue-points h25' },
                        this.props.item.points,
                        ' pts'
                    )
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-2 button-column' },
                    React.createElement(
                        'button',
                        { className: 'completeButton w100 h50', onClick: this.clickComplete },
                        'Complete'
                    ),
                    React.createElement(
                        'button',
                        { className: 'deleteButton w100 h50', onClick: this.clickDelete },
                        'Delete'
                    )
                )
            )
        );
    }

}

export { QueueItem };