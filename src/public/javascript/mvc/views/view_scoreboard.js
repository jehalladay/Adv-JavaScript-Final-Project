'use strict'

export {ViewScore};

function scoreboard(score) {

    var score = score || {
        "Monday"        : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
        "Tuesday"       : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
        "Wednesday"     : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
        "Thursday"      : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
        "Friday"        : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
        "Saturday"      : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
        "Sunday"        : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
        "Total"         : {"Points": 0,   "Last Week": 0,   "Historic High": 0},
        "Historic Total": {"Points": 0,   "Last Week": 0,   "Historic High": 0}
    };


    var values = [
        ['Day'      , 'Points'                         , 'Last Week'                         , 'Historic High'],
        ["Mon:"     , score['Monday']['Points']        , score['Monday']['Last Week']        , score['Monday']['Historic High']],
        ["Tues:"    , score['Tuesday']['Points']       , score['Tuesday']['Last Week']       , score['Tuesday']['Historic High']],
        ["Weds:"    , score['Wednesday']['Points']     , score['Wednesday']['Last Week']     , score['Wednesday']['Historic High']],
        ["Thurs:"   , score['Thursday']['Points']      , score['Thursday']['Last Week']      , score['Thursday']['Historic High']],
        ["Fri:"     , score['Friday']['Points']        , score['Friday']['Last Week']        , score['Friday']['Historic High']],
        ["Sat:"     , score['Saturday']['Points']      , score['Saturday']['Last Week']      , score['Saturday']['Historic High']],
        ["Sun:"     , score['Sunday']['Points']        , score['Sunday']['Last Week']        , score['Sunday']['Historic High']],
        ["Total:"   , score['Total']['Points']         , score['Total']['Last Week']         , score['Total']['Historic High']],
        ["Historic:", score['Historic Total']['Points'], score['Historic Total']['Last Week'], score['Historic Total']['Historic High']]
    ]

    var columnIDs = [
        ['rows'                 , 'th'],
        ['points'               , 'td'],
        ['totals_prev'           , 'td'],
        ['totals_historic_column', 'td']
    ]

    var rowIDs = [
        'columns',
        'monday',
        'tuesday',
        'wednesday',
        'thursday',
        'friday',
        'saturday',
        'sunday',
        'totals_row',
        'totals_historic_row',
    ]

    var table = React.createElement(
        'table', 
        {'class': 'table table-dark table-hover', 'key':'Scoreboard_View'}, 
        rowIDs.map((x, i) => {
            // make rows
            return React.createElement(
                'tbody',
                {key: `tbody_${x}_${i}`},
                React.createElement(
                    'tr',
                    {'id': x, key: `${x}_${i}`},
                    columnIDs.map((y, j) => {
                        // Make columns; first Column uses 'th' tag
                        if (j > 0) {
                            return React.createElement(
                                i>0? 'td': 'th',
                                {'class': y[0], key: `${y}_${j}`},
                                values[i][j]
                            )
                        } else {
                            return React.createElement(
                                y[1],
                                {'class': y[0], key: `${y}_${j}`},
                                values[i][j]
                            );
                        };
                    })
                )
            )
        })    
    );
    return table;
}


class ViewScore {
    constructor() {

        return this;
    };

    build() {

        return this;
    };

    selectors() {

        return this;
    };

    populate(score) {
        
        return this;
    };

    delete() {
        
        return this;
    };

};