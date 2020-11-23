let recordContainer = document.getElementById('recordContainer');
let recordText = document.getElementById('record');
let box = document.getElementById('box');
let overlay = document.getElementById('overlay');
let gameMessage = document.getElementById('gamemessage');
let helpMessage = document.getElementById("helpmessage");

let bottom = document.getElementById('bottom');
let despos = document.getElementById('despos');
let description = document.getElementById('description');
let mainButts = new Array;
let optButts = new Array;
let backButt = new Array;
let undoEnabled = false;

let nums = new Array;
let numsMem = new Array;
let gen = true;
let isThisLoss = false;
let victory = false;
let paused = false;
let record = 0;


document.body.addEventListener("keydown", move);
for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
        let cell = document.createElement("div");
        let inner = document.createElement("p");
        cell.id = r + "_" + c;
        cell.className = "cell";
        inner.className = "inner";
        cell.append(inner);
        box.append(cell);
    }
}


initializeDebug();
initializeButts();

function initialize() {
    nums = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    numsMem = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    gen = true;
    showUndo = false;
    isThisLoss = false;
    victory = false;
    paused = false;
    overlay.style.display = "none";
    setValR();
    setValR();
    storeMem();
}

function initializeDebug() {
    nums = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    numsMem = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    gen = true;
    showUndo = false;
    isThisLoss = false;
    victory = false;
    overlay.style.display = "none";
    setValM(3, 3, 1024);
    setValM(3, 2, 1024);
    update();
}

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
function storeMem() {
    let copy = [[],[],[],[]];
    let store = false;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            copy[r][c] = nums[r][c];
            if (numsMem.length && (nums[r][c] !== numsMem[numsMem.length - 1][r][c])) {
                store = true;
            }
        }
    }
    if (!numsMem.length || store) {
        console.log("Added to mem");
        if (numsMem.length === 10) {
            numsMem.shift();
        }
        numsMem.push(copy);
    }
    else {
        console.log("No change");
    }
}

function undoer() {
    if (numsMem.length) {
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                nums[r][c] = numsMem[numsMem.length - 1][r][c];
            }
        }
    }
    numsMem.pop();
    update();
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
        helpMessage.style.display = "flex";
        helpMessage.innerHTML = "Press backspace or the U key to undo up to 10 moves";
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
}

function update() {
    let filled = true;
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            let cell = document.getElementById(r + "_" + c).children;
            switch(nums[r][c]) {
                case 2:
                    cell[0].innerHTML = nums[r][c];
                    cell[0].style.fontSize = "60px";
                    cell[0].style.backgroundColor = "#7fffd4";
                    break;
                case 4:
                    cell[0].innerHTML = nums[r][c];
                    cell[0].style.fontSize = "60px";
                    cell[0].style.backgroundColor = "#7fffd4";
                    break;
                case 8:
                    cell[0].innerHTML = nums[r][c];
                    cell[0].style.fontSize = "60px";
                    cell[0].style.backgroundColor = "#1affb2";
                    recordContainer.style.display = "flex";
                    break;
                case 16:
                    cell[0].innerHTML = nums[r][c];
                    cell[0].style.fontSize = "60px";
                    cell[0].style.backgroundColor = "#d98cf2";
                    break;
                case 32:
                    cell[0].innerHTML = nums[r][c];
                    cell[0].style.fontSize = "60px";
                    cell[0].style.backgroundColor = "#d24dff";
                    break;
                case 64:
                    cell[0].innerHTML = nums[r][c];
                    cell[0].style.fontSize = "60px";
                    cell[0].style.backgroundColor = "#e600e6";
                    break;
                case 128:
                    cell[0].innerHTML = nums[r][c];
                    cell[0].style.fontSize = "40px";
                    cell[0].style.backgroundColor = "#d98cf2";
                    break;
                case 256:
                    cell[0].innerHTML = nums[r][c];
                    cell[0].style.fontSize = "40px";
                    cell[0].style.backgroundColor = "#d98cf2";
                    break;
                case 512:
                    cell[0].innerHTML = nums[r][c];
                    cell[0].style.fontSize = "40px";
                    cell[0].style.backgroundColor = "#d98cf2";
                    break;
                case 1024:
                    cell[0].innerHTML = nums[r][c];
                    cell[0].style.fontSize = "35px";
                    cell[0].style.backgroundColor = "#d98cf2";
                    break;
                case 2048:
                    victory = true;
                    cell[0].innerHTML = nums[r][c];
                    cell[0].style.fontSize = "35px";
                    cell[0].style.backgroundColor = "#d98cf2";
                    break;
                default:
                    filled = false;
                    cell[0].innerHTML = null;
                    cell[0].style.backgroundColor = "indigo";
            }
            if (record < nums[r][c]) {
                record = nums[r][c];
                recordText.innerHTML = "Record: " + record;
            }
        }
    }
    if (filled && !isThisLoss) {
        isThisLoss = true;
        for (let r = 0; r < 4; r++) {
            for (let c = 0; c < 4; c++) {
                if (r === 0) {
                    if (nums[0][c] === nums[1][c]) {
                        isThisLoss = false;
                    }
                }
                else if (r === 3) {
                    if (nums[3][c] === nums[2][c]) {
                        isThisLoss = false;
                    }
                }
                else {
                    if (nums[r][c] === nums[r - 1][c] || nums[r][c] === nums[r + 1][c]) {
                        isThisLoss = false;
                    }
                }
                if (c === 0) {
                    if (nums[r][0] === nums[r][1]) {
                        isThisLoss = false;
                    }
                }
                else if (c === 3) {
                    if (nums[r][3] === nums[r][2]) {
                        isThisLoss = false;
                    }
                }
                else {
                    if (nums[r][c] === nums[r][c - 1] || nums[r][c] === nums[r][c + 1]) {
                        isThisLoss = false;
                    }
                }
            }
        }
    }
    showOverlay();
}

function showOverlay() {
    if (victory) {
        gameMessage.innerHTML = "YOU WIN";
        overlay.style.display = "flex";
    }
    else if (isThisLoss) {
        gameMessage.innerHTML = "GAME OVER";
        overlay.style.display = "flex";
    }
    else {
        overlay.style.display = "none";
    }
}

function setValR() {
    if (gen) {
        let randX = Math.floor(Math.random() * 4);
        let randY = Math.floor(Math.random() * 4);
        if (nums[randX][randY] === 0) {
            let rand = (Math.floor(Math.random() * 2) * 2) + 2;
            setValM(randX, randY, rand);
            update();
        }
        else {
            setValR();
        }
    }
}

function setValM(x, y, num) {
    nums[x][y] = num;
}

function move(event) {
    if (!isThisLoss && !victory && !paused) {
        gen = false;
        storeMem();
        if (event.key === "ArrowUp"|| event.key === "w") {
            console.log("move up");
            for (let c = 0; c < 4; c++) {
                let col = [];
                for (let r = 0; r < 4; r++) {
                    if (nums[r][c]) {
                        if (col.length != 0 && col[col.length - 1] == nums[r][c]) {
                            col[col.length - 1] += "x2";
                        }
                        else {
                            col.push(nums[r][c]);
                        }
                    }
                }
                if (col.length) {
                    let r = 0;
                    while (col.length) {
                        if (typeof(col[0]) === "string") {
                            col[0] = parseInt(col[0].substr(0, col[0].search("x2"))) * 2;
                        }
                        if (nums[r][c] !== col[0]) {
                            gen = true;
                        }
                        nums[r][c] = col[0];
                        col.shift();
                        r++;
                    }
                    while (r < 4) {
                        nums[r][c] = 0;
                        r++;
                    }
                }
            }
            setValR();
        }
        if (event.key === "ArrowLeft"|| event.key === "a") {
            console.log("move left");
            for (let r = 0; r < 4; r++) {
                let row = [];
                for (let c = 0; c < 4; c++) {
                    if (nums[r][c]) {
                        if (row.length != 0 && row[row.length - 1] == nums[r][c]) {
                            row[row.length - 1] += "x2";
                        }
                        else {
                            row.push(nums[r][c]);
                        }
                    }
                }
                if (row.length) {
                    let c = 0;
                    while (row.length) {
                        if (typeof(row[0]) === "string") {
                            row[0] = parseInt(row[0].substr(0, row[0].search("x2"))) * 2;
                        }
                        if (nums[r][c] !== row[0]) {
                            gen = true;
                        }
                        nums[r][c] = row[0];
                        row.shift();
                        c++;
                    }
                    while (c < 4) {
                        nums[r][c] = 0;
                        c++;
                    }
                }
            }
            setValR();
        }
        if (event.key === "ArrowDown" || event.key === "s") {
            console.log("move down");
            for (let c = 0; c < 4; c++) {
                let col = [];
                for (let r = 3; r >= 0; r--) {
                    if (nums[r][c]) {
                        if (col.length != 0 && col[col.length - 1] == nums[r][c]) {
                            col[col.length - 1] += "x2";
                        }
                        else {
                            col.push(nums[r][c]);
                        }
                    }
                }
                if (col.length) {
                    let r = 3;
                    while (col.length) {
                        if (typeof(col[0]) === "string") {
                            col[0] = parseInt(col[0].substr(0, col[0].search("x2"))) * 2;
                        }
                        if (nums[r][c] !== col[0]) {
                            gen = true;
                        }
                        nums[r][c] = col[0];
                        col.shift();
                        r--;
                    }
                    while (r >= 0) {
                        nums[r][c] = 0;
                        r--;
                    }
                }
            }
            setValR();
        }
        if (event.key === "ArrowRight"|| event.key === "d") {
            console.log("move right");
            for (let r = 0; r < 4; r++) {
                let row = [];
                for (let c = 3; c >= 0; c--) {
                    if (nums[r][c]) {
                        if (row.length != 0 && row[row.length - 1] == nums[r][c]) {
                            row[row.length - 1] += "x2";
                        }
                        else {
                            row.push(nums[r][c]);
                        }
                    }
                }
                if (row.length) {
                    let c = 3;
                    while (row.length) {
                        if (typeof(row[0]) === "string") {
                            row[0] = parseInt(row[0].substr(0, row[0].search("x2"))) * 2;
                        }
                        if (nums[r][c] !== row[0]) {
                            gen = true;
                        }
                        nums[r][c] = row[0];
                        row.shift();
                        c--;
                    }
                    while (c >= 0) {
                        nums[r][c] = 0;
                        c--;
                    }
                }
            }
            setValR();
        }
    }
}

function printArray(array) { //debug
    let output = "";
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            output += array[r][c] + "|";
        }
        output += '\n';
    }
    console.log(output);
}

function randTest() { //debug
    for (let i = 0; i < 16; i++) {
        setValR();
    }
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
            return "Starts a new game";
        case "Options":
            return "Customize game options";
        case "Help":
            return "Get help";
        case "Timer?":
            return "Enable/disable timer";
        case "Undo?":
            if (undoEnabled) 
                return "Disable undo function";
            else
                return "Enable undo function";
        case "Back":
            return "Return to main menu";
    }
}