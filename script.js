/* 
1.Input is set by the user in 2 text boxes, 1 for the height and 1 for the width
and 1 button to resset the grid.
(Grid is responsive, more squares means more detail in the board, as they will become smaller,
this could be achieved with flexbox shrink and growth factors).

2.Input is got by the script and sees if it is a number
and if that number is more than 0 and less or equal to 100.
    -If is valid no error is displayed.
    -If not, an error message is display on the UI.

3.When the button is pressed:
    -If Inputs are valid, resets the grid with the size specified.
    -If not, resets the grid but doesn't resizes it.

4.When the mouse hovers over a square, that square changes to a random color.

5.every square touched is an interaction, and for every interaction all saquares
not currently black turn 10% more darker.
*/
"use strict";

const DEFAULT_SIZE = 16;
let lastRowNum = DEFAULT_SIZE;
let lastColumnNum = DEFAULT_SIZE;
const darkeningQueue = []

const rowInput = document.querySelector("#rowInput");
const columnInput = document.querySelector("#columnInput");
const resetBtn = document.querySelector("#resetBtn");
const boardContainer = document.querySelector("#boardContainer")

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
}

function getRandomColor () {
   return Math.floor(Math.random() * 255); 
}

function darkenColor (rgbColor) {
    let concadenatedNumber = "";
    let colorArr = []

    for (let i = 0; i < rgbColor.length; i++) {
        if (!isNaN(+rgbColor[i])) {
            concadenatedNumber += rgbColor[i];
        } else if (rgbColor[i] === "," || rgbColor[i] === ")") {
            colorArr.push((+concadenatedNumber) - (+concadenatedNumber * 0.1));
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

    for (let i = 0; i < darkeningQueue.length; i++) {
        if (darkeningQueue[i] == 0 && darkeningQueue.length == 12) {
            darkeningQueue[i].style.backgroundColor = "black";
        } else {
            darkeningQueue[i].style.backgroundColor = darkenColor(darkeningQueue[i].style.backgroundColor);
        }
    }
}

function paintSquare (e) {
    let element = e.target;
    if (element.className === "columnItem") {
        element.style.backgroundColor = `rgb(${getRandomColor()}, ${getRandomColor()}, ${getRandomColor()})`;
        e.stopPropagation();
        queuingColor(e);
    }
}

rowInput.addEventListener("input", setRows, false);
columnInput.addEventListener("input", setColumns, false);
resetBtn.addEventListener("click", setBoard, false);
window.addEventListener("mouseover", paintSquare, false);