var btnElement = ' <button onclick="NextTurn()">Next turn</button>';
var players = new Array(2); //יוצר מערך לשחקנים
var brd = new MainBoard();
var currentPlayer = 0; // מי השחקן הנוכחי
var isWin = false;
var turnsCounter = 0; //סופר כמה תורות
brd.startNewGame(3);
brd.ShowExampleBoard(); //מראה את הקורדינאטות לדוגמא
players[0] = new Player(prompt("Welcome to the XO challange. Today you will play with \"X\"\nBut First, please enter your name:"), "X");
players[1] = new Computer("Jarvis the Machine", "O");
document.write("Let the game begin</br></br>");
document.write("<br/>" + btnElement);
function NextTurn() {
    var isWin;
    var coordinates;
    document.write("<br/>-------- Turn # " + (turnsCounter + 1) + " --------<br/><br/>");
    coordinates = players[currentPlayer].playerInput();
    if (MainBoard.board[coordinates.Row][coordinates.Column] != undefined) {
        alert("This position is taken by " + MainBoard.board[coordinates.Row][coordinates.Column] + "\nPlease Try Again");
        NextTurn();
        return;
    }
    isWin = brd.newWIN(players[currentPlayer].plyrSgn, coordinates.Row, coordinates.Column);
    turnsCounter++;
    printStatus();
    if (isWin) {
        alert(players[currentPlayer].plyrNme + " - WIN !!!!!");
        return;
    }
    if (currentPlayer == 0)
        currentPlayer++;
    else
        currentPlayer = 0;
    if (turnsCounter == 9) {
        alert("Its a tie. Nobody wins");
        return;
    }
    ;
    if (currentPlayer == 0)
        document.write("<br/>" + btnElement);
    else
        NextTurn();
}
function printStatus() {
    var board = MainBoard.board;
    for (var r = 0; r < board.length; r++) {
        for (var c = 0; c < board.length; c++) {
            if (board[r][c] != undefined) {
                document.clear();
                document.write(board[r][c] + " &nbsp");
            }
            else
                document.write("- &nbsp");
        }
        document.write("<br/>");
    }
}
//# sourceMappingURL=app.js.map