let box = document.getElementById('box');
let reset = document.getElementById('Reset');
let overlay = document.getElementById('overlay');
let gameMessage = document.getElementById('gamemessage');
let bottom = document.getElementById('bottom');
let buttons = document.getElementsByClassName('button');
let cells = new Array;
let nums = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
let numsMem = new Array;
let gen = true;
let showUndo = false;
let isThisLoss = false;
let victory = false;
overlay.style.display = "none";

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
/*
setValM(3, 3, 1024);
setValM(3, 2, 1024);
update();*/
setValR();
setValR();
storeMem();
addButtFunc();

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

function addButtFunc() {
    //console.log(buttons.length);
    if (buttons.length) {
        for (let b = 0; b < buttons.length; b++) {
            buttons[b].addEventListener("mouseover", hi);
            buttons[b].addEventListener("mouseout", bye);
            switch (buttons[b].id) {
                case "Undoer":
                    buttons[b].addEventListener("click", undoer);
                    break;
                case "Reset":
                    buttons[b].addEventListener("click", resetter);
                    break;
                case "Options":
                    buttons[b].addEventListener("click", options);
                    break;
                case "Timer?":
                    break;
                case "Undo?":
                    buttons[b].addEventListener("click", toggUndo);
                    break;
                case "Back":
                    buttons[b].addEventListener("click", back);
                    break;
            }
            let text = document.createElement("p");
            text.innerHTML = buttons[b].id;
            buttons[b].appendChild(text);
        }
    }
    else {
        alert("Nothing in buttons");
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

function resetter() {
    console.log("reset");
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            nums[r][c] = 0;
        }
    }
    gen = true;
    isThisLoss = false;
    victory = false;
    setValR();
    setValR();
    update();
    overlay.style.display = "none";
    bottom.style.marginTop = "15px";
}

function options() {
    while (bottom.firstChild) {
        bottom.removeChild(bottom.lastChild);
    }
    let timer = document.createElement("div");
    timer.id = "Timer?";
    timer.className = "button";
    bottom.appendChild(timer);
    let undo = document.createElement("div");
    undo.id = "Undo?";
    undo.className = "button";
    bottom.appendChild(undo);
    let back = document.createElement("div");
    back.id = "Back";
    back.className = "button";
    bottom.appendChild(back);
    addButtFunc();
}

function toggUndo() {
    if (showUndo) {
        showUndo = false;
    }
    else {
        showUndo = true;
    }
}

function back() {
    while (bottom.firstChild) {
        bottom.removeChild(bottom.lastChild);
    }
    if (showUndo) {
        let undo = document.createElement("div");
        undo.id = "Undoer";
        undo.className = "button";
        bottom.appendChild(undo);
    }
    let newReset = document.createElement("div");
    newReset.id = "Reset";
    newReset.className = "button";
    reset = newReset;
    bottom.appendChild(newReset);
    let options = document.createElement("div");
    options.id = "Options";
    options.className = "button";
    bottom.appendChild(options);
    addButtFunc();
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
        }
    }
    if (victory) {
        console.log("2048");
        gameMessage.innerHTML = "YOU WIN";
        overlay.style.display = "flex";
        bottom.style.marginTop = "-391px";
        reset.firstChild.innerHTML = "New Game";
    }
    else if (filled && !isThisLoss) {
        let isThisLoss = true;
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
        if (isThisLoss) {
            console.log("Game over");
            gameMessage.innerHTML = "GAME OVER";
            overlay.style.display = "flex";
            bottom.style.marginTop = "-391px";
            reset.firstChild.innerHTML = "New Game";
        }
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
    if (!isThisLoss && !victory) {
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
}
function bye() {
    this.style.transform = "scale(1, 1)";
}
