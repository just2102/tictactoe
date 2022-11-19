let field   =   document.querySelectorAll('.square')
let board   =   document.getElementById('board')
let header  =   document.getElementById('head')
let footer  =   document.getElementById('foot')
let whoseTurn   =   document.getElementById('whose_turn')
let player1Input    =   document.getElementById('player1')
let player2Input    =   document.getElementById('player2')
let winnerAnnouncement  =   document.getElementById('winner_announcement')



let gameboard   =   [];

const playerFactory   =   (name,instrument)  => {
    return {name,instrument}
}

let player1 =   playerFactory(player1Input.value,'X');
let player2 =   playerFactory(player2Input.value,'O');

const startButton   =   document.getElementById('start_button');
startButton.addEventListener('click',writeInput)

function writeInput() {
    player1 =   playerFactory(player1Input.value,'X');
    player2 =   playerFactory(player2Input.value,'O');
    // initial state
    let currentPlayer   =   player1;
    let previousPlayer  =   player2;
    header.style.display    =   'none';
    footer.style.display    =   'grid';
    board.style.display     =   'grid';
    whoseTurn.innerText     =   currentPlayer.name+"'s turn";
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
                whoseTurn.innerText     =   currentPlayer.name+"'s turn";
                checkForWinner()
            } else if (currentPlayer==player2 && fld.firstChild == null) { 
                const circle =  document.createElement("img");
                circle.setAttribute('class','circle')
                circle.src  =   "img/circle-svgrepo-com.svg"
                fld.appendChild(circle)
                fld.firstChild  =   circle
                currentPlayer   =   player1;
                previousPlayer  =   player2;
                whoseTurn.innerText     =   currentPlayer.name+"'s turn";
                checkForWinner()
            } if (checkForWinner()==1) {
                whoseTurn.style.display =   'none'
                winnerAnnouncement.innerText    =   player1.name +' won!'
            } else if (checkForWinner()==2) {
                whoseTurn.style.display =   'none'
                winnerAnnouncement.innerText    =   player2.name +' won!'
                
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
            return 1
    } else if ((row1==winResultO)||(row2==winResultO)||(row3==winResultO)||
        (column1==winResultO)||column2==winResultO||column3==winResultO||
        diagonalLeftToRight==winResultO||diagonalRightToLeft==winResultO ) {
            return 2;
        }
}


    // restarts the game
let restartButton   =   document.getElementById('restart_button')
restartButton.addEventListener('click',restart)
function restart() {
    gameboard=[];
    footer.style.display    =   'none';
    board.style.display     =   'none';
    header.style.display    =   'grid';
    whoseTurn.style.display =   'block';
    winnerAnnouncement.innerText    =   '';
    for (const fld of field) {
        while (fld.firstChild) {
            fld.firstChild.remove()
        }
    }
    player1 =   {}
    player2 =   {}
}


