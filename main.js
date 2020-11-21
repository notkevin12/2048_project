let box = document.getElementById('box');
let reset = document.getElementById('reset');
let overlay = document.getElementById('overlay');
let gameMessage = document.getElementById('gamemessage');
let cells = new Array;
let nums = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
let numsMem;
let gen = true;
let isThisLoss = false;
let victory = false;
overlay.style.opacity = "0%";
gameMessage.style.opacity = "0%";

reset.addEventListener("mouseover", hi);
reset.addEventListener("mouseout", bye);
reset.addEventListener("click", resetter);
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
        overlay.style.opacity = "60%";
        gameMessage.style.opacity = "100%";
        gameMessage.innerHTML = "YOU WIN";
        reset.style.bottom = "645px";
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
            overlay.style.opacity = "60%";
            gameMessage.style.opacity = "100%";
            gameMessage.innerHTML = "GAME OVER";
            reset.style.bottom = "645px";
        }
    }
    //printArray();
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
        if (event.key === "ArrowUp"|| event.key === "w") {
            console.log("move up");
            gen = false;
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
            gen = false;
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
            gen = false;
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
            gen = false;
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

function printArray() { //debug
    let output = "";
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            output += nums[r][c] + "|";
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
    reset.style.transform = "scale(1.1, 1.1)";
}
function bye() {
    reset.style.transform = "scale(1, 1)";
}

function resetter() {
    console.log("reset");
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            nums[r][c] = 0;
        }
    }
    gen = true;
    setValR();
    update();
    overlay.style.opacity = "0%";
    gameMessage.style.opacity = "0%";
    reset.style.bottom = "445px";
}
