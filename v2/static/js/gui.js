var response = ""
var session, workout, set_idx, weight_mode, weight

function chooseAccount(account_name) {
    for (let user of serverdata) {
        if (user.name == account_name) {
            userdata = user
            break
        }
    }

    switchMenu("main")
}

// hides all menus that are not being used
function switchMenu(menu_name) {
    const menus = document.body.getElementsByClassName("menu")

    for (let menu of menus) {
        menu.style.display = 'none'
    }

    let menu = document.getElementById(menu_name)
    menu.style.display = 'block'
}

// adds a new session to userdata
function newSession() {
    let weekday = getWeekday()
    let session = {
        "weekday": weekday,
        "workouts": []
    }
    userdata.sessions.push(session)

    continueSession()
}

function sessionComplete() {
    switchMenu("main")
}

// adds the next workout to queue
function nextWorkout() {
    let session = userdata.sessions[userdata.sessions.length - 1]

    let workouts = userdata.schedule[getWeekday()]

    if (workouts.length == session.workouts.length) {
        sessionComplete()
        return
    }

    let name = workouts[session.workouts.length]

    let workout = {
        "name": name,
        "sets": []
    }
    set_idx = 0
    session.workouts.push(workout)

    document.getElementById("exersize").innerText = name;
}

function logSet(weight, reps) {
    let set = { "weight": weight, "reps": reps }
    let session = userdata.sessions[userdata.sessions.length - 1]
    workout = session.workouts[session.workouts.length - 1]
    workout.sets.push(set)

    let sets = workout.sets
    let s = ""

    for (let i = 0; i < 3; i++) {
        if (i < sets.length)
            s += sets[i].weight.toString() + " - " + sets[i].reps.toString() + " / "
        else
            s += "__ - __ / "
    }
    s = s.slice(0, -2)

    document.getElementById("sets").innerText = s;

    if (++set_idx == 3) {
        nextWorkout()
    }
}

function continueSession() {
    session = userdata.sessions.length - 1
    workout = userdata.sessions[session].workouts.length - 1
    set_idx += 1
    weight_mode = true
    nextWorkout()
}

function updateInstruction(msg) {
    document.getElementById("instruction").innerText = msg
    response = ""
    updateResponse()
}

function keypadConfirm() {
    if (response == "") response = "0"

    if (!weight_mode) {
        let reps = parseInt(response)
        logSet(weight, reps)
        updateInstruction("ENTER WEIGHT:")
    } else {
        weight = parseInt(response)
        updateInstruction("ENTER REPS:")
    }
    weight_mode = !weight_mode
}

function keypadTap(key) {
    if (key == "<")
        response = ""
    else if (key == ">")
        keypadConfirm()
    else
        response += key

    updateResponse()
}

function updateResponse() {
    msg = response
    if (msg == "") msg = 0
    document.getElementById("response").innerText = msg
}