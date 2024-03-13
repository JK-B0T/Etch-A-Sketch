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