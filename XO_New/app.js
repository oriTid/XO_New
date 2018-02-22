var btnElement = ' <button onclick="NextTurn()" style = "color:red">Next turn</button> ';
var players = new Array(2); //יוצר מערך לשחקנים
var brd = new MainBoard(); //אתחול לוח המשחק
var currentPlayer = 0; // מי השחקן הנוכחי
var isWin = false;
var turnsCounter = 0; //סופר כמה תורות
players[0] = new Player(prompt("Welcome to the XO challange. Today you will play with \"X\"\nBut First, please enter your name:"), "X"); //קליטת שם של שחקן
players[1] = new Computer("Jarvis the Machine", "O"); // הקמת השחקן של המחשב
var boardSize = getBoardSize();
brd.startNewGame(boardSize); // קביעת גודל הלוח - כרגע קבוע על 3על3 
brd.ShowExampleBoard(boardSize); //קריאה לפונציקה שתציג את פוזיציות לדוגמא
document.write("Let the game begin</br></br>");
document.write("<br/>" + btnElement);
function NextTurn() {
    var isWin; // הגדרת משתנה לנצחון - בוליאני
    var coordinates; //יצירת משתנה מסוג מחלקת קודינאטות  
    coordinates = players[currentPlayer].playerInput(); // קליטת הקודינאטות מהשחקן או מהמחשב
    isWin = brd.newWIN(players[currentPlayer].plyrSgn, coordinates.Row, coordinates.Column); //שליחת נתונים לפונקציית בדיקת נצחון - סימן וקודינאטות
    printStatus(); //אם יש נצחון תדפיס 
    turnsCounter++; //העברת תור
    if (isWin) {
        alert(players[currentPlayer].plyrNme + " - WIN !!!!!");
        return;
    }
    if (currentPlayer == 0)
        currentPlayer++;
    else
        currentPlayer = 0;
    if (turnsCounter == boardSize * boardSize) {
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
    document.body.innerHTML = "";
    document.body.style.backgroundColor = "aquamarine";
    brd.ShowExampleBoard(boardSize); //הדפת לוח משחק לדוגמא
    document.write("<br/>-------- Turn # " + (turnsCounter + 1) + " --------<br/><br/>"); // הדפת מספר התור על המסך
    var board = MainBoard.board;
    for (var r = 0; r < board.length; r++) {
        for (var c = 0; c < board.length; c++) {
            if (board[r][c] != undefined) {
                document.clear();
                document.write(board[r][c] + " &nbsp &nbsp");
            }
            else
                document.write("- &nbsp &nbsp");
        }
        document.write("<br/>");
    }
}
function getBoardSize() {
    var boardSize;
    while (boardSize == undefined || isNaN(boardSize)) {
        boardSize = parseInt(prompt("Please choose board size 3-7. Please try again:"));
        if (isNaN(boardSize)) {
            alert("Please eneter number only");
            continue;
        }
        if (boardSize < 3 || boardSize > 7) {
            alert("Please eneter number between 3 to 7");
            boardSize = undefined;
        }
    }
    return boardSize;
}
//# sourceMappingURL=app.js.map