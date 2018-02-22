var MainBoard = /** @class */ (function () {
    function MainBoard() {
    }
    //////////Methods///////
    MainBoard.prototype.startNewGame = function (x) {
        MainBoard.board = new Array(x);
        for (var i = 0; i < MainBoard.board.length; i++) {
            MainBoard.board[i] = new Array(x);
        }
    };
    MainBoard.prototype.ShowExampleBoard = function (x) {
        //document.body.sty
        var mat = new Array(x);
        var counter = 0;
        for (var z = 0; z < mat.length; z++) {
            mat[z] = new Array(x);
            for (var c = 0; c < mat[z].length; c++) {
                mat[z][c] = counter;
                counter++;
            }
        }
        var tempStr = "<br/>";
        document.write("This are the example coordinates numbers: <br/>");
        for (var i = 0; i < mat.length; i++) {
            for (var j = 0; j < mat[i].length; j++) {
                tempStr += " &nbsp;" + mat[i][j] + " &nbsp;|";
            }
            tempStr += "<br/>------------------<br/><br/>";
        }
        document.write("</div>");
        document.write(tempStr + " <br/>");
    };
    MainBoard.GetCoordinates = function (position) {
        var coordinates;
        var c = 0;
        var r = 0;
        for (var i = 0; i < position; i++) {
            c++;
            if (c > MainBoard.board.length - 1) {
                r++;
                c = 0;
            }
        }
        coordinates = new BoardCoordinates(r, c);
        return coordinates;
    };
    MainBoard.prototype.newWIN = function (char, r, c) {
        MainBoard.board[r][c] = char;
        var tempResult = true; //משתנה זכייה שידע לעצור באם יש זכייה 
        for (var i = 0; i < MainBoard.board.length; i++) {
            if (!this.checkCell(char, i, c)) {
                tempResult = false;
                break;
            } //ריצה על השורות
        }
        if (tempResult)
            return true; //  אז יש נצחוןTRUE במידה ולולאת בדיקת השורות בעמודה סיימה ב
        tempResult = true;
        for (var i = 0; i < MainBoard.board.length; i++) {
            if (!this.checkCell(char, r, i)) {
                tempResult = false;
                break;
            }
        }
        if (tempResult)
            return true; //  אז יש נצחוןTRUE במידה ולולאת בדיקת עמודות בשורה בעמודה סיימה ב
        if (r == c) {
            tempResult = true;
            for (var i = 0; i < MainBoard.board.length; i++) {
                if (!this.checkCell(char, i, i)) {
                    tempResult = false; // FALSE אם יש סימן שונה או תא ריק באחד התאים באלכסון הראשי - סמן את משתנה הנצחון ב
                    break;
                }
            }
            if (tempResult)
                return true; //  אז יש נצחוןTRUE במידה ולולאת בדיקת אלכסונים  ב
        }
        if (r + c + 1 == MainBoard.board.length) {
            tempResult = true;
            for (var i = 0; i < MainBoard.board.length; i++) {
                if (!this.checkCell(char, i, MainBoard.board.length - i - 1)) {
                    tempResult = false;
                    break;
                }
            }
        }
        return tempResult;
    };
    MainBoard.prototype.checkCell = function (char, r, c) {
        if (MainBoard.board[r][c] == undefined)
            return false;
        if (MainBoard.board[r][c] != char)
            return false;
        return true;
    };
    return MainBoard;
}());
//# sourceMappingURL=MainBoard.js.map