let field   =   document.querySelectorAll('.square')

let gameboard   =   [];

const playerFactory   =   (name,instrument)  => {
    return {name,instrument}
}
const cross =   document.createElement("img");
cross.setAttribute('class','cross')
cross.src   =   "img/cross-svgrepo-com.svg"


let player1 =   playerFactory('jim','X');
let player2 =   playerFactory('jeff','O');
let currentPlayer   =   player1;
let previousPlayer  =   player2;

function writeInput() {                


   
    for (const fld of field) {
        fld.addEventListener('click',function(event) {
            gameboard[fld.id-1]=currentPlayer.instrument;
            if (currentPlayer==player1 && fld.firstChild == null) {    
                const cross =   document.createElement("img");
                cross.setAttribute('class','cross')
                cross.src   =   "img/cross-svgrepo-com.svg"
                fld.appendChild(cross)
                currentPlayer   =   player2;
                previousPlayer  =   player1;
                checkForWinner()
            } else if (currentPlayer==player2 && fld.firstChild == null) { 
                const circle =  document.createElement("img");
                circle.setAttribute('class','circle')
                circle.src  =   "img/circle-svgrepo-com.svg"
                fld.appendChild(circle)
                fld.firstChild  =   circle
                currentPlayer   =   player1;
                previousPlayer  =   player2;
                checkForWinner()
            }
        })
    }
}
 
function checkForWinner() { 
    let row1    =   JSON.stringify(gameboard.slice(0,3));
    let row2    =   JSON.stringify(gameboard.slice(3,6));
    let row3    =   JSON.stringify(gameboard.slice(6,9));

    let column1 =   JSON.stringify(Array.from(gameboard[0]+gameboard[3]+gameboard[6]))
    let column2 =   JSON.stringify(Array.from(gameboard[1]+gameboard[4]+gameboard[7]))
    let column3 =   JSON.stringify(Array.from(gameboard[2]+gameboard[5]+gameboard[8]))

    //top left to right bot
    let diagonalLeftToRight    =   JSON.stringify(Array.from(gameboard[0]+gameboard[4]+gameboard[8]))
    
    //right top to left bot
    let diagonalRightToLeft   =   JSON.stringify(Array.from(gameboard[2]+gameboard[4]+gameboard[6]))

    let winResultX  =   JSON.stringify(['X','X','X'])
    let winResultO  =   JSON.stringify(['O','O','O'])
    if ((row1== winResultX) || (row2== winResultX)||(row3== winResultX)||
        (column1== winResultX)||(column2== winResultX)||(column3== winResultX)||
        (diagonalLeftToRight== winResultX)||(diagonalRightToLeft==winResultX)) {
            console.log('x won')
    } else if ((row1==winResultO)||(row2==winResultO)||(row3==winResultO)||
        (column1==winResultO)||column2==winResultO||column3==winResultO||
        diagonalLeftToRight==winResultO||diagonalRightToLeft==winResultO ) {
            console.log('o won!')
        }
     else {
        console.log('nothing happens')
    }
}


