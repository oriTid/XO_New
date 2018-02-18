let btnElement: string = ' <button onclick="NextTurn()">Next turn</button>';
let players: Array<Player> = new Array(2); //יוצר מערך לשחקנים
let brd: MainBoard = new MainBoard();

let currentPlayer: number = 0; // מי השחקן הנוכחי
let isWin: boolean = false;
let turnsCounter: number = 0; //סופר כמה תורות

brd.startNewGame(3);
brd.ShowExampleBoard(); //מראה את הקורדינאטות לדוגמא

players[0] = new Player(prompt(`Welcome to the XO challange. Today you will play with "X"\nBut First, please enter your name:`), "X");
players[1] = new Computer("Jarvis the Machine", "O");
document.write("Let the game begin</br></br>");
document.write(`<br/>` + btnElement);



function NextTurn(): void {
    let isWin: boolean;
    let coordinates : BoardPosition
  
    document.write(`<br/>-------- Turn # ${turnsCounter + 1} --------<br/><br/>`);

    coordinates = players[currentPlayer].playerInput();



    if (MainBoard.board[coordinates.Row][coordinates.Column] != undefined) {
        alert(`This position is taken by ${MainBoard.board[coordinates.Row][coordinates.Column]}\nPlease Try Again`);
        NextTurn();
        return;
    }
    
    isWin = brd.newWIN(players[currentPlayer].plyrSgn, coordinates.Row, coordinates.Column);

    turnsCounter++;
   
    printStatus();
    if (isWin) {
        alert(`${players[currentPlayer].plyrNme} - WIN !!!!!`)
        return;
    }

    if (currentPlayer == 0)    //משנה לשחקן הבא
        currentPlayer++;
    else
        currentPlayer = 0;

    if (turnsCounter == 9)
    {
        alert("Its a tie. Nobody wins");
        return;
    };


    if (currentPlayer == 0) 
        document.write(`<br/>` + btnElement);
    else
        NextTurn();
}


function printStatus(): void { // פונקציית הדפסה
    let board: string[][] = MainBoard.board;
    for (let r: number = 0; r < board.length; r++) {

        for (let c: number = 0; c < board.length; c++) {
            if (board[r][c] != undefined) {
                document.clear();
                document.write(`${board[r][c]} &nbsp`);
            }
            else
                document.write(`- &nbsp`);
        }
        document.write(`<br/>`);

    }
}

