import {ControlPanel} from './controlPanel.js'
import {MasterQueue} from './masterQueue.js'
import {CategoryQueue} from './categoryQueue.js'
import {ScoreboardView} from './scoreboardView.js'

class Planner extends React.Component {


    componentDidMount() {
        console.log(this.props)
    }

    render() {
        return(
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 comp-container control-container">
                        <ControlPanel subjects={this.props.subjects} categories={this.props.categories} mQueue={this.props.masterQueue} queue={this.props.queue} refresh={this.props.refresh}/>
                    </div>
                    <div className="col-md-6 comp-container master-queue-container">
                        <MasterQueue mQueue={this.props.masterQueue} queue={this.props.queue} refresh={this.props.refresh} sb={this.props.sb}/>
                    </div>
                    <div className="col-md-3 comp-container scoreboard-container">
                        <ScoreboardView refresh={this.props.refresh} score={this.props.sb.score}/>
                    </div>
                </div>
            </div>
        );
        
    }
}

export {Planner};