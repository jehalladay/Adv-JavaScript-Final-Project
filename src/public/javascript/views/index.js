function compose(...funcs) { 
    return (x) => funcs.reduceRight(((value, func)=>func(value)), x);
}


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
        'columns'   , 'monday',
        'tuesday'   , 'wednesday',
        'thursday'  , 'friday',
        'saturday'  , 'sunday',
        'totals_row', 'totals_historic_row',
    ]

    var table = React.createElement(
        'table', 
        {'class': 'table table-dark table-hover', 'key':'Scoreboard_View'}, 
        React.createElement(
            'tbody',
            {key: `Sb_tbody`},
            rowIDs.map((x, i) => {
            // make rows
                return React.createElement(
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
            })    
        )
    );
    return table;
};


function queueBuilder(checkMultiplier, categories, queue) {
    var idCreator = {
        'Homework': 'homework-que',
        'Projects': 'project-que',
        'Reading' : 'reading-que',
        'Tests'   : 'test-que',
        'Videos'  : 'video-que'
    };

    function layer1(category, queue) {
        if (queue[category][0]) {
            if (queue[category][0]['due'].split !== undefined) {
                var Qdate = Date.parse(queue[category][0]['due']) 
            } else {
                var Qdate = queue[category][0]['due']
            }
            Qdate = new Date(Qdate);
            var data = [
                `Due Date:  ${Qdate.getMonth() + 1}/${Qdate.getDate()}`,
                queue[category][0]['todo'],
                queue[category][0]['subject'],
                queue[category][0]['details'],
                checkMultiplier(queue[category][0].due),
                queue[category][0]['points']
            ]
        } else {
            var data = [
                'Due Date: ', 'Nothing',
                ''          , 'None',
                '0'         , '0x'
            ]
        };

        return [
            ['section', 'que-head'            , [
                ['div', 'que-line que-category-head', category],
                ['div', 'que-line que-due', data[0]],
            ]],
            ['div'    , 'que-bar'             , [
                ['section', 'que-title', [
                        ['div'   , 'que-line que-todo-title'           , 'To-Do:'],
                        ['div'   , 'que-line que-subject-title'        , 'Subject:'],
                        ['button', 'que-line que-button-right complete', 'Complete']
                    ]
                ],
                ['section', 'que-title', [
                        ['div'   , 'que-line que-todo-title'         , data[1]],
                        ['div'   , 'que-line que-subject-title'      , data[2]],
                        ['button', 'que-line que-button-right delete', 'Delete']
                    ]
                ]
            ]],
            ['section', 'que-bar que-contents', [
                ['div', 'que-line que-details que-contents', data[3]],
                ['div', 'que-line que-points que-multiplier que-contents', data[4]],
                ['div', 'que-line que-points points que-contents', data[5]]
            ]]
        ];
    };

    var queues =  React.createElement(
        'div',
        {'key': "queue-container"},
        categories.map((x, i) => {
            var inner = layer1(x, queue);

            return React.createElement(
                'div',
                {'class': 'que-category', 'id': idCreator[x], 'key': `queue-${x}`},
                inner.map((y, j) => {
                    
                    return React.createElement(
                        y[0],
                        {'class': y[1], 'key': `${y}${j}`},
                        y[2].map((z, k) => {
                            console.log('z[2]: ', z[2])
                            if (z[2].join === undefined) {
                                var fill = z[2]
                            } else {
                                var fill = z[2].map((a, l) => {
                                    return React.createElement(
                                        a[0],
                                        {'class': a[1], 'key': `${a}${l}`},
                                        a[2]
                                    );
                                })
                            };
                            return React.createElement(
                                z[0],
                                {'class': z[1], 'key': `${z}${k}`},
                                fill
                            )
                        })
                    );

                })
            );
        })
    );


    return queues;
};

function queueBuilder2(checkMultiplier, categories, queue) {

    var emptyQueue = {
        'subject': '',
        'todo':'Nothing',
        'details':'None',
        'points':'0'
    };

    var dueDate = categories.map((a) => 
        queue[a][0]? 
        '':
        new Date(
            (queue[a][0]['due'].getDate)?
                queue[a][0]['due']:
                Date.parse(queue[a][0]['due'])))

    var multiplier = dueDate.map((a) => checkMultiplier(a))

    var counter = 0;

    var level1 = [
        ['div', {'key':counter++, 'className': 'que-category', 'id': 'homework-que'}],
        ['div', {'key':counter++, 'className': 'que-category', 'id': 'project-que'}],
        ['div', {'key':counter++, 'className': 'que-category', 'id': 'reading-que'}],
        ['div', {'key':counter++, 'className': 'que-category', 'id': 'test-que'}],
        ['div', {'key':counter++, 'className': 'que-category', 'id': 'video-que'}]
    ];
    
    var level2 = [
        ['section', {'key':counter++, 'className': 'que-head'}],
        ['div', {'key':counter++, 'className': 'que-bar'}],
        ['section', {'key':counter++, 'className': 'que-bar que-contents'}],
    ]
    
    var level3 = [
        ['div', {'key':counter++, 'className': 'que-line que-category-head'}],
        ['div', {'key':counter++, 'className': 'que-line que-date'}],
        ['section', {'key':counter++, 'className': 'que-title'}],
        ['section', {'key':counter++, 'className': 'que-area que-contents'}],
        ['div', {'key':counter++, 'className': 'que-line que-details que-contents'}],
        ['div', {'key':counter++, 'className': 'que-line que-points que-multiplier que-contents'}],
        ['div', {'key':counter++, 'className': 'que-line que-points points que-contents'}]
    ];
    
    var level4 = [
        ['div', {'key':counter++, 'className': 'que-line que-todo-title'}],
        ['div', {'key':counter++, 'className': 'que-line que-subject-title'}],
        ['button', {'key':counter++, 'className': 'que-line que-button-right complete'}],
        ['div', {'key':counter++, 'className': 'que-line que-todo que-contents'}],
        ['div', {'key':counter++, 'className': 'que-line que-subject que-contents'}],
        ['button', {'key':counter++, 'className': 'que-line que-button-right delete'}],
    ];

    var level4Headers = ['To-Do:', 'Subject:', 'Complete', 'todo', 'subject', 'Delete']
    
    var level4Contents = categories.map(
        (a) => level4Headers.map(
            (x, i) => (i != 3 && i != 4)? x: 
                queue[a][0]? queue[a][0][x]: emptyQueue[x]));

    var allLevel4 = categories.map(
        (a, b) => level4.map(
            (x, i) => React.createElement(x[0], x[1], level4Contents[b][i])));
        
    var level3Content = categories.map((a, b) => 
        level3.map((x, i) => {
            switch(i) {
                case 0: return a;
                case 1: return dueDate[b];
                case 2: return allLevel4[b].filter((y, j) => j < 3);
                case 3: return allLevel4[b].filter((y, j) => j > 2);
                case 4: return queue[a][0]? queue[a][0]['details']: emptyQueue['details'];
                case 5: return `x${multiplier[b]}`;
                case 6: return queue[a][0]? queue[a][0]['points']: emptyQueue['points'];
            };})
        )

    var allLevel3 = categories.map(
        (a, b) => level3.map(
            (x, i) => React.createElement(x[0], x[1], level3Content[b][i])))

    var allLevel2 = categories.map(
        (a, b) => level2.map(
            (x, i) => {
                switch(i) {
                    case 0: var content = allLevel3[b].filter((y, j)=> j < 2); break;
                    case 1: var content = allLevel3[b].filter((y, j)=> j > 1 && j < 4); break;
                    case 2: var content = allLevel3[b].filter((y, j)=> j > 3);
                };

                return React.createElement(x[0], x[1], content);
            }))
        
    var allLevel1 =level1.map(
                    (x, i)=> React.createElement(x[0], x[1], allLevel2[i]));

        
    return React.createElement('div', {'key': "queue-container", 'id': 'queue'}, allLevel1);
};




function checkMultiplier(x) {return '1'}

var categories = ["Homework", "Projects", "Reading", "Tests", "Videos"]

var Testqueue = {
    "Homework": [
      {
        "subject": "mechanics",
        "todo": "hw1",
        "details": "",
        "due": "2020-04-27T06:00:00.000Z",
        "points": "1"
      },
      {
        "subject": "mechanics",
        "todo": "hw2",
        "details": "",
        "due": "2020-05-06T06:00:00.000Z",
        "points": "2"
      }
    ],
    "Projects": [
      {
        "subject": "mechanics",
        "todo": "proj1",
        "details": "https://www.youtube.com/watch?v=CnailTcJV_U",
        "due": "2020-04-28T06:00:00.000Z",
        "points": "10"
      }
    ],
    "Reading": [
      {
        "subject": "mechanics",
        "todo": "ch1",
        "details": "",
        "due": "2020-05-24T06:00:00.000Z",
        "points": "2"
      }
    ],
    "Tests": [
      {
        "subject": "mechanics",
        "todo": "exam4",
        "details": "",
        "due": "2020-04-29T06:00:00.000Z",
        "points": "10"
      }
    ],
    "Videos": [
      {
        "subject": "mechanics",
        "todo": "lewin2",
        "details": "https://www.youtube.com/watch?v=CnailTcJV_U",
        "due": "2020-04-28T06:00:00.000Z",
        "points": "1"
      }
    ]
  }



function reLaunch(score) {
    ReactDOM.render(scoreboard(score), document.getElementById('root'))

}

function launch() {
    ReactDOM.render(queueBuilder2(checkMultiplier,categories,Testqueue), document.getElementById('root'))
}