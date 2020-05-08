import {QueueItem} from './queueItem.js';




class MasterQueue extends React.Component {
    constructor(props){
        super(props);
        console.log('this is mq constructor: ', props)
        this.props.mQueue.stateSetter = this.setState.bind(this)
        this.props.refresh.mQsetState = this.setState.bind(this)
        console.log(this.props.refresh)

    }
    




    componentDidMount() {
        console.log("in masterQueue", this.props.mQueue.queue)
        console.log("in masterQueue2", this.props)
    }

    render() {
        return (            
        <div id="master-queue">
            <div className='master-queue-head'>
                <h1>
                    MasterQueue
                </h1>
            </div>
            {this.props.mQueue.queue.master.map((x, i)=><QueueItem refresh={this.props.refresh} parentQueue={this.props.mQueue} item={x} num={i} key={`mQueue${i}`} sb={this.props.sb}/>)}
        </div>
        );
    }; 
};
 
export {MasterQueue};