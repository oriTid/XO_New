var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Computer = /** @class */ (function (_super) {
    __extends(Computer, _super);
    function Computer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    //////////// Methods ////////////////////
    Computer.prototype.playerInput = function () {
        var coordinate = undefined;
        var row = 0;
        var col = 0;
        var findCount; //משתנה שיספור את כמות הסימונים הנדרשת במערך הפנימי על מנת לדעת האם אפשר לשים סימן בשורה
        var gameMap; // יצירת מערך למחשב שבו יכניס את הסימנים לכל אחת מהאפשרויות  
        gameMap = new Array(MainBoard.board.length * 2 + 2); //אתחול מערך ריבוי לפי גודל הלוח + שני אלכסונים
        for (var i = 0; i < gameMap.length; i++) {
            gameMap[i] = new Array(MainBoard.board.length); //  אתחול מערכים של רוחב הלוח בתוך המערך של האפשרויות
        }
        for (var i = 0; i < MainBoard.board.length; i++) {
            for (var x = 0; x < gameMap[i].length; x++) {
                gameMap[i][x] = new BoardCoordinates(row, col); //אתחול כל תא במערך האפשרויות לפי קורדינאטות בסימן העדכני
                if (MainBoard.board[row][col] != undefined)
                    gameMap[i][x].Sign = MainBoard.board[row][col];
                col++;
                if (col > MainBoard.board.length - 1) {
                    row++;
                    col = 0;
                }
            }
        }
        row = 0;
        col = 0;
        for (var i = MainBoard.board.length; i < MainBoard.board.length * 2; i++) {
            for (var x = 0; x < gameMap[i].length; x++) {
                gameMap[i][x] = new BoardCoordinates(row, col); //אתחול כל תא במערך האפשרויות לפי קורדינאטות בסימן העדכני
                if (MainBoard.board[row][col] != undefined)
                    gameMap[i][x].Sign = MainBoard.board[row][col];
                row++;
                if (row > MainBoard.board.length - 1) {
                    col++;
                    row = 0;
                }
            }
        }
        row = 0;
        col = 0;
        for (var i = 0; i < gameMap[gameMap.length - 2].length; i++) {
            gameMap[gameMap.length - 2][i] = new BoardCoordinates(row, col);
            gameMap[gameMap.length - 2][i].Sign = MainBoard.board[row][col];
            row++;
            col++;
        }
        row = 0;
        col = MainBoard.board.length - 1;
        for (var i = 0; i < gameMap[gameMap.length - 1].length; i++) {
            gameMap[gameMap.length - 1][i] = new BoardCoordinates(row, col);
            gameMap[gameMap.length - 1][i].Sign = MainBoard.board[row][col];
            row++;
            col--;
        }
        findCount = MainBoard.board.length - 1; // הגדרה של כמה תאים במערך הפנימי צריך לבדוק
        while (coordinate == undefined && findCount > 0) {
            coordinate = this.GetCoordinates(findCount, gameMap, true); // מחזיר קורדינטה איפה לסמן את סימן המחשב
            if (coordinate != undefined)
                break;
            if (findCount == MainBoard.board.length - 1)
                coordinate = this.GetCoordinates(findCount, gameMap, false);
            findCount--;
        }
        if (coordinate == undefined) {
            findCount = 0;
            while (coordinate == undefined) {
                var fndRow = this.random(0, gameMap.length); //קבל שורה רנדומלית ממערך האפשרויות של מפת המשחק
                for (var z = 0; z < gameMap[fndRow].length; z++) {
                    if (gameMap[fndRow][z].Sign == undefined) {
                        findCount++;
                        break;
                    }
                }
                if (findCount == MainBoard.board.length || findCount == 1) {
                    var fndCol = undefined;
                    while (fndCol == undefined) {
                        fndCol = this.random(0, gameMap[fndRow].length);
                        if (gameMap[fndRow][fndCol].Sign != undefined)
                            fndCol = undefined;
                    }
                    coordinate = new BoardCoordinates(gameMap[fndRow][fndCol].Row, gameMap[fndRow][fndCol].Column);
                }
                if (coordinate != undefined)
                    break;
            }
        }
        return coordinate;
    };
    Computer.prototype.GetCoordinates = function (findCount, gameMap, isComputer) {
        var goodCount = 0; //ספירה של הסימנים שזהים לסימן שהמחשב מחפש לצורך ניצחון או חסימה
        var coordinate = undefined;
        for (var i = 0; i < gameMap.length; i++) {
            goodCount = 0;
            for (var z = 0; z < gameMap[i].length; z++) {
                if (isComputer) {
                    if (gameMap[i][z].Sign != undefined && gameMap[i][z].Sign == this.plyrSgn) {
                        goodCount++;
                        continue; //אם נמצא הסימן המבוקש של המחשב, תמשיך לאיטרציה הבאה.
                    }
                    else {
                        if (gameMap[i][z].Sign != undefined && gameMap[i][z].Sign != this.plyrSgn) {
                            goodCount = 0;
                            break;
                        }
                    }
                }
                else {
                    if (gameMap[i][z].Sign != undefined && gameMap[i][z].Sign != this.plyrSgn) {
                        goodCount++;
                        continue; //אם נמצא הסימן ההפוך (של השחקן), תמשיך לאיטרציה הבאה.
                    }
                }
            }
            if (goodCount == findCount) {
                for (var v = 0; v < gameMap[i].length; v++) {
                    if (gameMap[i][v].Sign == undefined) {
                        coordinate = new BoardCoordinates(gameMap[i][v].Row, gameMap[i][v].Column); //קיבעת הקורדינאטה של המיקום שנמצא
                        break;
                    }
                }
            }
            if (coordinate != undefined)
                break;
        }
        return coordinate; //תחזיר קודינאטות 
    };
    Computer.prototype.random = function (min, max) {
        var r = (Math.random() * (max - min)) + min;
        return Math.floor(r);
    };
    return Computer;
}(Player));
//# sourceMappingURL=Computer.js.map