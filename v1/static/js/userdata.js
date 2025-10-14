const SERVER = "http://127.0.0.1:5000";

var serverdata = [
    {
        "username": "DavidH",
        "workouts": [
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
        "history": []
    }
];

var userdata;

async function updateServer() {
    try {
        const response = await fetch(SERVER + "/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userdata)
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        const result = await response.json();
        console.log("Server update successful:", result);
    } catch (err) {
        console.error("Failed to update server:", err);
    }
}

async function initializeServer(callback) {

    // FOR TESTING
    userdata = serverdata[0]
    return
    // END TEST

    try {
        const response = await fetch(SERVER + "/init", {
            method: "GET",
            headers: { "Accept": "application/json" }
        });

        if (!response.ok) throw new Error(`Server error: ${response.status}`);

        serverdata = await response.json();
        userdata = serverdata[0];

        console.log("Server initialized successfully:", userdata);

        if (typeof callback === "function") callback(userdata);
    } catch (err) {
        console.error("Failed to initialize server:", err);

        // optional fallback: still call callback with default data
        if (typeof callback === "function") callback(userdata || serverdata[0]);
    }
}


function logSet(weight, reps) {
    session = userdata.history[lastWorkoutIdx()]
    idx = session.workouts.length - 1
    set = {
        weight: weight,
        reps: reps
    }
    session.workouts[idx].sets.push(set)
    console.log(`Logged ${reps} reps at ${weight} pounds doing ${session.workouts[idx].name} on ${session.date}`)

    if (session.workouts[idx].sets.length >= 3)
        nextWorkout()
}

function workoutComplete() {
    alert("Workout complete!")
}

function nextWorkout() {
    session = userdata.history[lastWorkoutIdx()]
    idx = session.workouts.length
    if (idx >= userdata.workouts[getWeekday()].length) {
        workoutComplete()
        return
    }

    workout = {
        name: userdata.workouts[getWeekday()][idx],
        sets: []
    }

    session.workouts.push(workout)
}

function startNewSession() {
    const todayIdx = getWeekday();

    const new_session = {
        date: getDateString(),
        workouts: []
    }

    // Push today's workout(s)
    const todayWorkouts = userdata.workouts[todayIdx] || []; // fallback empty array
    todayWorkouts.forEach(workoutName => {
        new_session.workouts.push({
            name: workoutName,
            sets: []
        });
    });

    userdata.history.push(new_session);
}


function PR8Info() {
    alert("PR8 is the most weight you've ever lifted for eight consecutive reps.")
}

function lastWorkoutIdx() {
    return userdata.history.length - 1
}

function setup() {
    initializeServer(
        (successful) => {
            if (successful)
                if (userdata.history.length == 0 || userdata.history[lastWorkoutIdx()].workouts.length >= userdata.workouts.length)
                    startNewSession()
                else
                    alert("Server may be offline!")
        })
}
