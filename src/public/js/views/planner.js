import { ControlPanel } from './controlPanel.js';
import { MasterQueue } from './masterQueue.js';
import { CategoryQueue } from './categoryQueue.js';
import { ScoreboardView } from './scoreboardView.js';

class Planner extends React.Component {

    componentDidMount() {
        console.log(this.props);
    }

    render() {
        return React.createElement(
            'div',
            { className: 'container-fluid' },
            React.createElement(
                'div',
                { className: 'row' },
                React.createElement(
                    'div',
                    { className: 'col-md-3 comp-container control-container' },
                    React.createElement(ControlPanel, { subjects: this.props.subjects, categories: this.props.categories, mQueue: this.props.masterQueue, queue: this.props.queue, refresh: this.props.refresh })
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-6 comp-container master-queue-container' },
                    React.createElement(MasterQueue, { mQueue: this.props.masterQueue, queue: this.props.queue, refresh: this.props.refresh, sb: this.props.sb })
                ),
                React.createElement(
                    'div',
                    { className: 'col-md-3 comp-container scoreboard-container' },
                    React.createElement(ScoreboardView, { refresh: this.props.refresh, score: this.props.sb.score })
                )
            )
        );
    }
}

export { Planner };