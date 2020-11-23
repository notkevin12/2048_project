let timerBox = document.getElementById('timerbox');
    bottom = document.getElementById('bottom');
    despos = document.getElementById('despos');
    description = document.getElementById('description');
    mainButts = new Array;
    optButts = new Array;
    backButt = new Array;
    timerEnabled = false;
    undoEnabled = false;
    
clearInterval(timerId);
initializeButts();

function initializeButts() {
    let button = buttonTemplate("Reset");
    button.addEventListener("click", reset);
    mainButts.push(button);
    button = buttonTemplate("Options");
    button.addEventListener("click", options);
    mainButts.push(button);
    button = buttonTemplate("Help");
    button.addEventListener("click", help);
    mainButts.push(button);
    button = buttonTemplate("Timer?");
    button.addEventListener("click", toggTimer);
    optButts.push(button);
    button = buttonTemplate("Undo?");
    button.addEventListener("click", toggUndo);
    optButts.push(button);
    button = buttonTemplate("Back");
    button.addEventListener("click", back);
    optButts.push(button);
    backButt.push(button);
    for (let b = 0; b < mainButts.length; b++) {
        bottom.appendChild(mainButts[b]);
    }
}
function buttonTemplate(id) {
    let button = document.createElement("div");
    let text = document.createElement("p");
    text.innerHTML = id;
    button.appendChild(text);
    button.id = id;
    button.className = "button";
    button.addEventListener("mouseover", hi);
    button.addEventListener("mouseout", bye);
    button.addEventListener("click", bye);
    return button;
}
function hi() {
    this.style.transform = "scale(1.1, 1.1)";
    let domRect = this.getBoundingClientRect();
    description.innerHTML = getDescription(this.id);
    despos.style.display = "flex";
    despos.style.left = (domRect.left + domRect.width/2 - description.clientWidth/2) + "px";
}
function bye() {
    this.style.transform = "scale(1, 1)";
    despos.style.display = "none";
}
function getDescription(id){
    switch (id) {
        case "Reset":
            return "Start a new game";
        case "Options":
            return "Game options";
        case "Help":
            return "Get help";
        case "Timer?":
            if (timerEnabled)
                return "Disable timer";
            else
                return "Enable timer";
        case "Undo?":
            if (undoEnabled) 
                return "Disable undo";
            else
                return "Enable undo";
        case "Back":
            return "Return to main menu";
    }
}
function reset() {
    console.log("reset");
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            nums[r][c] = 0;
        }
    }
    initialize();
}
function options() {
    while (bottom.firstChild) {
        bottom.removeChild(bottom.lastChild);
    }
    for (let b = 0; b < optButts.length; b++) {
        bottom.appendChild(optButts[b]);
    }
}
function help() {
    paused = true;
    gameMessage.innerHTML = "PLAYING 2048:";
    helpMessage.innerHTML = "Use your arrow keys or WASD to move the tiles. Tiles with the same number merge into one when they touch. Add them up to reach 2048!";
    helpMessage.style.display = "block";
    overlay.style.display = "flex";
    while (bottom.firstChild) {
        bottom.removeChild(bottom.lastChild);
    }
    bottom.appendChild(backButt[0]);
}
function toggTimer() {
    paused = true;
    helpMessage.style.display = "block";
    overlay.style.display = "flex";
    while (bottom.firstChild) {
        bottom.removeChild(bottom.lastChild);
    }
    bottom.appendChild(backButt[0]);
    if (timerEnabled) {
        timerEnabled = false;
        gameMessage.innerHTML = "TIMER: OFF";
        helpMessage.style.display = "none";
        timerBox.style.display = "none";
    }
    else {
        timerEnabled = true;
        gameMessage.innerHTML = "TIMER: ON";
        helpMessage.innerHTML = "Your game will be timed";
        helpMessage.style.display = "flex";
        timerBox.style.display = "flex";
    }
}
function toggUndo() {
    paused = true;
    helpMessage.style.display = "block";
    overlay.style.display = "flex";
    while (bottom.firstChild) {
        bottom.removeChild(bottom.lastChild);
    }
    bottom.appendChild(backButt[0]);
    if (undoEnabled) {
        undoEnabled = false;
        gameMessage.innerHTML = "UNDO: OFF";
        helpMessage.style.display = "none";
    }
    else {
        undoEnabled = true;
        gameMessage.innerHTML = "UNDO: ON";
        helpMessage.innerHTML = "Press backspace or the U key to undo up to 10 moves";
        helpMessage.style.display = "flex";
    }
}
function back() {
    if (paused) {
        paused = false;
        helpMessage.style.display = "none";
        showOverlay();
    }
    while (bottom.firstChild) {
        bottom.removeChild(bottom.lastChild);
    }
    for (let b = 0; b < mainButts.length; b++) {
        bottom.appendChild(mainButts[b]);
    }
    if (timerEnabled) {
        initialize();
    }
}