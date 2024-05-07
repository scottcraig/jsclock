const scheduleStr = `
[
    {
        "description": "4-Block Semester Schedule.",
        "days": [1,2,4,5],
        "values": [
            {
                "text": "Start of the day",
                "colour": "239, 52, 24",
                "start": "00:00",
                "end": "08:55",
                "type": "Break"
            },
            {
                "text": "A Block",
                "colour": "default",
                "start": "08:55",
                "end": "10:15",
                "type": "Block"
            },
            {
                "text": "Go to B Block Class",
                "colour": "239, 52, 24",
                "start": "10:15",
                "end": "10:25",
                "type": "Transition"
            },
            {
                "text": "B Block",
                "colour": "default",
                "start": "10:25",
                "end": "11:40",
                "type": "Block"
            },
            {
                "text": "Lunch",
                "colour": "239, 52, 24",
                "start": "11:40",
                "end": "12:15",
                "type": "Break"
            },
            {
                "text": "Go to C Block Class",
                "colour": "239, 52, 24",
                "start": "12:15",
                "end": "12:20",
                "type": "Transition"
            },
            {
                "text": "C Block",
                "colour": "default",
                "start": "12:20",
                "end": "13:40",
                "type": "Block"
            },
            {
                "text": "Go to D Block Class",
                "colour": "239, 52, 24",
                "start": "13:40",
                "end": "13:50",
                "type": "Transition"
            },
            {
                "text": "D Block",
                "colour": "default",
                "start": "13:50",
                "end": "15:05",
                "type": "Block"
            },
            {
                "text": "School is Over",
                "colour": "239, 52, 24",
                "start": "15:05",
                "end": "08:55",
                "type": "Break"
            }
        ] 
    },
    {
        "description": "2022/2023 Flex schedule with 4-Block system.",
        "days":[3],
        "values": [
            {
                "text": "Start of the day",
                "colour": "239, 52, 24",
                "start": "00:00",
                "end": "08:55",
                "type": "Break"
            },
            {
                "text": "Flex Time",
                "colour": "255, 255, 102",
                "start": "08:55",
                "end": "09:40",
                "type": "Block"
            },
            {
                "text": "A or B Block",
                "colour": "default",
                "start": "09:40",
                "end": "10:35",
                "type": "Block"
            },
            {
                "text": "Break",
                "colour": "239, 52, 24",
                "start": "10:35",
                "end": "10:45",
                "type": "Break"
            },
            {
                "text": "B or A Block",
                "colour": "default",
                "start": "10:45",
                "end": "11:40",
                "type": "Block"
            },
            {
                "text": "Lunch",
                "colour": "239, 52, 24",
                "start": "11:40",
                "end": "12:15",
                "type": "Break"
            },
            {
                "text": "Go to C or D Block",
                "colour": "239, 52, 24",
                "start": "12:15",
                "end": "12:20",
                "type": "Transition"
            },
            {
                "text": "C or D Block",
                "colour": "default",
                "start": "12:20",
                "end": "13:25",
                "type": "Block"
            },
            {
                "text": "Break",
                "colour": "239, 52, 24",
                "start": "13:15",
                "end": "13:25",
                "type": "Break"
            },
            {
                "text": "D or C Block",
                "colour": "default",
                "start": "13:25",
                "end": "14:20",
                "type": "Block"
            },
            {
                "text": "Flex Time",
                "colour": "255, 255, 102",
                "start": "14:20",
                "end": "15:05",
                "type": "Block"
            },
            {
                "text": "School is Over",
                "colour": "239, 52, 24",
                "start": "15:05",
                "end": "08:55",
                "type": "Break"
            }
        ]
    },
    {
        "description": "Weekend.",
        "days":[0,6],
        "values": [
            {
                "text": "Weekend",
                "colour": "239, 52, 24",
                "start": "00:00",
                "end": "00:00",
                "type": "Break"
            }
        ]
    }
]
`