class ScoreboardView extends React.Component {
    constructor(props) {
        super(props)
        this.props.refresh.sBsetState = this.setState.bind(this)
        this.rows = ['head', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday', 'Total', 'Historic Total']
        this.columns = ['Day', 'Points', 'Last Week', 'Historic High']
        this.abbr = {Monday:'Mon:', Tuesday:'Tues:', Wednesday:'Weds:', Thursday:'Thurs:', Friday:'Fri:', Saturday:'Sat:', Sunday:'Sun:', Total:'Total:', 'Historic Total':'Historic:'}
        console.log('sb props: ', this.props)
        console.log('sb score', this.props.score.Monday)
    }
    render() {
        return (
            <table className='table table-dark'>
                <div className='title-box table-title'>
                    ScoreBoard

                </div>
                
                {this.rows.map((x, i)=> {
                    if(i == 0) {
                        var columnValues = this.columns;
                    } else {
                        var columnValues = [this.abbr[x], this.props.score[x][this.columns[1]], this.props.score[x][this.columns[2]], this.props.score[x][this.columns[3]]]
                    }
                    console.log(columnValues)
                    return (     
                    <tr>
                        {columnValues.map((y, j) => {
                            return <th>{y}</th>
                        })}
                    </tr>
                    )})}

            </table>
        );
    };
};

export {ScoreboardView};