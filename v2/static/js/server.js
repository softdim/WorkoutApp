const SERVER = "http://127.0.0.1:6969/"
var serverdata
var userdata

function downloadServerData() {
    // makes a GET request at SERVER + "download"
    // sets serverdata to json result

    // placeholder
    serverdata = [
        {
            "name": "DavidH",
            "schedule": [
                [],
                [
                    "Bench Press",
                    "Dumbbell Shoulder Press",
                    "Incline Dumbbell Press",
                    "Dumbbell Lat Raise",
                    "Cable Tricep Pushdown"
                ],
                [
                    "Barbell Back Squat",
                    "Leg Press",
                    "Bulgarian Split Squat",
                    "Leg Extensions",
                    "Hip Thrusts",
                    "Hanging Knee Raise"
                ],
                [
                    "Rows",
                    "Pull Ups",
                    "Seated Cable Row",
                    "Incline Dumbbell Curls",
                    "Cable Curl",
                    "Ab Machine"
                ],
                [
                    "Romanian Deadlift",
                    "Leg Curl Machine",
                    "Walking Lunges",
                    "Standing Calf Raises",
                    "Hip Thrusts"
                ],
                [
                    "Incline Bench Press",
                    "Seated Cable Row",
                    "Dumbbell Lateral Raises",
                    "Dumbbell Hammer Curl",
                    "Cable Tricep Overhead Extension"
                ],
                []
            ],
            "sessions": [
                {
                    "weekday": 2,
                    "workouts": [
                        {
                            "name": "Bench Press",
                            "sets": [
                                {
                                    "weight": 120,
                                    "reps": 8
                                }
                            ]
                        }
                    ]
                }
            ],
            "settings": {
                "darkmode": true,
                "restdelay": 30
            }
        }
    ]

}

function uploadUserData() {
    // makes a POST request at SERVER + "upload"
    // sends userdata as json with the request
}

function setupChooseAccount() {
    let lines = ""
    for (let account of serverdata) {
        let line = `<div class="button" onclick="chooseAccount('${account.name}')">${account.name}</div>`
        lines += line
    }
    document.getElementById("chooseaccount").innerHTML = lines;
}

function preload(callback) {
    downloadServerData()

    setupChooseAccount()
    callback()
}