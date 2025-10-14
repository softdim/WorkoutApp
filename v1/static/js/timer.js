const REST_DUR = 30
var timer = -1

function updateTimer() {
    document.getElementById("prompt").innerText = "REST"
    document.getElementById("promptinput").innerText = timer.toString()

    if (timer-- > 0) {
        setTimeout(updateTimer, 1000)
    } else {
        setTimeout(() => {
            updatePromptInput()
            document.getElementById("prompt").innerText = prompt_msg
        }, 100)
    }
}

function startTimer() {
    timer = REST_DUR
    updateTimer()
}
