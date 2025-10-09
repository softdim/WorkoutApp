var prompt_msg = ""
var prompt_value = ""
var weight_mode = true

function makePrompt(msg) {
    document.getElementById("prompt").innerText = msg
    prompt_msg = msg
    prompt_value = ""
    updatePromptInput()
}

function updatePromptInput() {
    if (timer != -1) return

    let msg
    if (prompt_value) {
        msg = prompt_value
        if (weight_mode && msg.length < 3) msg += "<grey>0</grey>"
    } else {
        msg = "<grey>0</grey>"
    }

    document.getElementById("promptinput").innerHTML = msg
}

function kpClick(key) {
    if (key == "back") {
        prompt_value = ""
        timer = 0
    } else if (key == "enter") {
        promptOutput()
        prompt_value = ""
    } else if (prompt_value.length < 3) {
        prompt_value += key
    }

    updatePromptInput()
}

function promptOutput() {
    if (!prompt_value) return

    if (weight_mode) {
        if (prompt_value.length < 3) prompt_value += "0"
        makePrompt("ENTER REPS")
    } else {
        makePrompt("ENTER WEIGHT")
        startTimer()
    }

    weight_mode = !weight_mode
}
