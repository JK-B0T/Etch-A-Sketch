"use strict";

const DEFAULT_SIZE = 16;
let lastRowNum = DEFAULT_SIZE;
let lastColumnNum = DEFAULT_SIZE;
const darkeningQueue = []

const rowInput = document.querySelector("#rowInput");
const columnInput = document.querySelector("#columnInput");
const resetBtn = document.querySelector("#resetBtn");
const boardContainer = document.querySelector("#boardContainer")

rowInput.value = 16;
columnInput.value = 16;

function setRows () {
    let rows = +rowInput.value;

    if (isNaN(rows)) {
        rowInput.value = lastRowNum;
        return lastRowNum;
    } else if (rows <= 0) {
        rowInput.value = 1;
        lastRowNum = 1;
    } else if (rows > 100){
        rowInput.value = 100;
        lastRowNum = 100;
    } else {
        lastRowNum = rows;
    }
}
function setColumns () {
    let columns = +columnInput.value;

    if (isNaN(columns)) {
        columnInput.value = lastColumnNum;
        return lastColumnNum;
    } else if (columns <= 0) {
        columnInput.value = 1;
        lastColumnNum = 1;
    } else if (columns > 100){
        columnInput.value = 100;
        lastColumnNum = 100;
    } else {
        lastColumnNum = columns;
    }
}

function setBoard () {
    const row = document.createElement("div");
    const column = document.createElement("div");
    row.classList.add("rowContainer");
    column.classList.add("columnItem");

    while (boardContainer.firstChild) {
        boardContainer.removeChild(boardContainer.firstChild);
    }

    for (let i = 0; i < lastColumnNum; i++) {
        const columnClone = column.cloneNode();
        row.appendChild(columnClone);
    }
    for (let i = 0; i < lastRowNum; i++) {
        const rowClone = row.cloneNode(true);
        boardContainer.appendChild(rowClone);
    }

    if (lastColumnNum === lastRowNum) {
        boardContainer.style.width = "90vh";
        boardContainer.style.height = "90vh";
    } else if (lastColumnNum > lastRowNum) {
        const newBoardHeight = 90 * (lastRowNum / lastColumnNum);
        boardContainer.style.height = newBoardHeight + "vh";
        boardContainer.style.width = "90vh";
    } else {
        const newBoardWidth = 90 * (lastColumnNum / lastRowNum);
        boardContainer.style.width = newBoardWidth + "vh";
        boardContainer.style.height = "90vh";
    }
}

function getRandomNumber (maxNumber) {
    return Math.floor(Math.random() * (maxNumber + 1)); 
}

function getRandomColor () {
    return `hsl(${getRandomNumber(360)} 100 50)`
}

function darkenColor (rgbColor) {
    let concadenatedNumber = "";
    let colorArr = []

    for (let i = 0; i < rgbColor.length; i++) {
        if (!isNaN(+rgbColor[i])) {
            concadenatedNumber += rgbColor[i];
        } else if (rgbColor[i] === "," || rgbColor[i] === ")") {
            colorArr.push((+concadenatedNumber) - (+concadenatedNumber * 0.25));
            concadenatedNumber = "";
        }
    }
    return `rgb(${colorArr})`;
}

function queuingColor (e) {
    if (darkeningQueue.length <= 11) {
        darkeningQueue.push(e.target);
    } else {
        darkeningQueue.shift();
        darkeningQueue.push(e.target);
    }

    for (let i = 0; i < darkeningQueue.length-1; i++) {
        
        if (i == 0 && darkeningQueue.length == 12) {
            darkeningQueue[i].style.backgroundColor = "black";
        } else {
            darkeningQueue[i].style.backgroundColor = darkenColor(darkeningQueue[i].style.backgroundColor);
        }
    }
}

function paintSquare (e) {
    let element = e.target;
    if (element.className === "columnItem") {
        element.style.backgroundColor = getRandomColor();
        e.stopPropagation();
        queuingColor(e);
    }
}

rowInput.addEventListener("input", setRows, false);
columnInput.addEventListener("input", setColumns, false);
resetBtn.addEventListener("click", setBoard, false);
window.addEventListener("mouseover", paintSquare, false);

setBoard();