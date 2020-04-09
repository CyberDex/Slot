
const config = {
    phaser: {
        width: window.innerWidth,
        height: window.innerHeight,
        backgroundColor: '000000'
    },
    size: {
        minWidht: 800,
        minHeight: 600,
        zoom: 1,
        centerX: window.innerWidth / 2,
        centerY: window.innerHeight / 2,
        width: window.innerWidth,
        height: window.innerHeight,
        grafics: 'Big'
    },
    game:{
        spinButtonOffset:{
            x: 298,
            y: 195
        },
        balanceTextOffsetX: -20,
        balanceTextOffsetY: 190,
        balanceCommentOffsetX: -20,
        balanceCommentOffsetY: 230,
        atlasName: 'atlas',
        sprites: {
            spinButton: 'spinButton',
            balanceBg: 'priceBG'
        },
        slots:{
            atlasName: 'atlas',
            slotsList:[
                '3xBAR',
                'BAR',
                '2xBAR',
                '7',
                'Cherry',
            ]
        },
        reel:{
            width: 220,
            height: 307,
            slotsCount: 3,
            speed: 20,
            slotSize: 100,
        },
        machine:{
            width: 779,
            height: 376,
            reelsCount: 3,
            reelsFirstOffset: 26,
            reelsOffset: 32.5,
            stopDelay: 2000, // ms
            reelStopDelay: 500, // ms
            atlasName: 'atlas',
            sprites: {
                bottom: 'machineBG',
                top: 'machineTop',
                right: 'cards',
                left: 'tips'
            }
        }
    },
    payTable:{
        startBalance: 500,
        switcherText: ['Pay-table','Close'],
        text: [
            ['Pay-table:'],
            ['3 CHERRY symbols on top line 2000'], 
            ['3 CHERRY symbols on center line 1000'], 
            ['3 CHERRY symbols on bottom line 4000 '],
            ['3 7 symbols on any line 150'], 
            ['Any combination of CHERRY and 7 on any line 75'],
            ['3 3xBAR symbols on any line 50'], 
            ['3 2xBAR symbols on any line 20'], 
            ['3 BAR symbols on any line 10'],
            ['Combination of any BAR symbols on any line 5'],
        ],
        payment:{
            combinationOf3:{
                'Cherry': [4000,1000,2000],
                '7':      [150,150,150],
                'BAR':    [10,10,10],
                '2xBAR':  [20,20,20],
                '3xBAR':  [50,50,50],
            },
            onlyThisSlotsCombination:[
                [['Cherry','7'], 75],
                [['BAR','2xBAR','3xBAR'], 5]
            ]
        },
    },
    debugBar:{
        switcherText: ['Debug','Close', 'Mode', 'Random', 'Fixed'],
        width: 525,
        height: 333,
        slotSize:[153,54],
        dropZones:[// offset from bottom left
            [[90,182],[90,116],[90,49]],
            [[264,182],[264,116],[264,49]],
            [[438,182],[438,116],[438,49]]
        ],
        bg:{
            atlas: 'atlas',
            sprite: 'debug'
        },
    }
}

export { config}