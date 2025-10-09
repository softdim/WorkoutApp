
var prompt_msg = ""
var prompt_value = ""
var weight_mode = true
const REST_DUR = 30
var timer = -1;
var serverdata;
var userdata;

function makePrompt(msg) {
    document.getElementById("prompt").innerText = msg
    prompt_msg = msg
    prompt_value = ""
    updatePromptInput()
}

function updatePromptInput() {
    if (timer != -1) return

    if (prompt_value) {
        msg = prompt_value;
        if (weight_mode && msg.length < 3) msg += "<grey>0</grey>"
    } else {
        msg = "<grey>0</grey>"
    }
    document.getElementById("promptinput").innerHTML = msg
}

function updateTimer() {
    document.getElementById("prompt").innerText = "REST"
    document.getElementById("promptinput").innerText = timer.toString()

    if (timer-- > 0)
        setTimeout(updateTimer, 1000)
    else setTimeout(() => {
        updatePromptInput()
        document.getElementById("prompt").innerText = prompt_msg
    }, 100)
}

function startTimer() {
    timer = REST_DUR
    updateTimer()
}

function kpClick(key) {
    if (key == "back") {
        prompt_value = ""
        timer = 0
    } else if (key == "enter") {
        promptOutput()
        prompt_value = ""
    } else if (prompt_value.length < 3)
        prompt_value += key

    updatePromptInput()
}

function promptOutput() {
    if (!prompt_value) return;

    if (weight_mode) {
        if (prompt_value.length < 3) prompt_value += "0"

        makePrompt("ENTER REPS")
    } else {
        makePrompt("ENTER WEIGHT")
        startTimer()
    }

    weight_mode = !weight_mode
}

function getDateString() {
    const now = new Date();
    const mm = String(now.getMonth() + 1).padStart(2, '0');
    const dd = String(now.getDate()).padStart(2, '0');
    const yy = String(now.getFullYear()).slice(-2);
    return `${mm}/${dd}/${yy}`;
}

function startNewSession() {
    new_session = {
        date: getDateString(),
        workouts: [
            {
                name: userdata.workouts[0],
                sets: []
            }
        ]
    }
    userdata.history.push(new_session)
}

function PR8Info() {
    alert("PR8 is the most weight you've ever lifted for eight consecutive reps.")
}

function setup() {
    userdata = serverdata[0]

    if (userdata.history[-1].workouts.length >= userdata.workouts.length)
        startNewSession()
}

setup()