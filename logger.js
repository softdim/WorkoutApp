
var prompt_value = ""
var weight_mode = true

function makePrompt(msg) {
    document.getElementById("prompt").innerText = msg
    prompt_value = ""
    updatePromptInput()
}

function updatePromptInput() {
    if (prompt_value) {
        msg = prompt_value;
        if (weight_mode && msg.length < 3) msg += "<grey>0</grey>"
    } else {
        msg = "<grey>0</grey>"
    }
    document.getElementById("promptinput").innerHTML = msg
}

function kpClick(key) {
    if (key == "back") {
        prompt_value = ""
    } else if (key == "enter") {
        promptOutput()
        prompt_value = ""
    } else if (prompt_value.length < 3)
        prompt_value += key

    updatePromptInput()
}

function promptOutput() {
    if (weight_mode) {
        if (prompt_value.length < 3) prompt_value += "0"

        alert(`Sending ${prompt_value}`)

        makePrompt("ENTER REPS")
    } else {
        alert(`Sending ${prompt_value}`)

        makePrompt("ENTER WEIGHT")
    }

    weight_mode = !weight_mode
}