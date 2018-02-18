class MainBoard {

    public static board: string[][];



    //////////Methods///////


    public startNewGame(x: number): void {
        MainBoard.board = new Array(x);
        for (let i = 0; i < MainBoard.board.length; i++) {
            MainBoard.board[i] = new Array(x);           
        }
    }

    public ShowExampleBoard(): void {
        let mat: number[][] = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8]
        ];
        let tempStr: string = "<br/>";
        document.write(`This are the coordinates numbers: <br/>`)
        for (let i: number = 0; i < mat.length; i++) {
            for (let j: number = 0; j < mat[i].length; j++) {
                tempStr += "&nbsp;" + mat[i][j] + "&nbsp;|";
            }
            tempStr += "<br/>----------<br/>";
        }
        document.write(`${tempStr} <br/>`);
    }

    public static GetCoordinates(position: number): BoardPosition {
        let coordinates: BoardPosition;
        let c: number=0;
        let r: number=0;

        for (let i = 0; i < position; i++) {
            c++;

            if (c > MainBoard.board.length - 1) {
                r++;
                c = 0;
            }
        }

        coordinates = new BoardPosition(r, c);
        return coordinates;
    }


    public newWIN(char: string, r: number, c: number): boolean {
        MainBoard.board[r][c] = char;

        let tempResult: boolean = true; //משתנה זכייה שידע לעצור באם יש זכייה 

        for (let i: number = 0; i < MainBoard.board.length; i++) { //וצא מהלולאה של הבדיקה הנוכחיתFALSE -אם יש סימן שונה/תא ריק באחד התאים בשורה סמן את משתנה זכייה ל   
            if (!this.checkCell(char, i, c)) {
                tempResult = false;
                break;
            }
        }

        if (tempResult) return true; //  אז יש נצחוןTRUE במידה ולולאת בדיקת השורות בעמודה סיימה ב

        tempResult = true;
        for (let i: number = 0; i < MainBoard.board.length; i++) {
            if (!this.checkCell(char, r, i)) { //  וצא מהלולאה של הבדיקה הנוכחיתALSE -אם יש סימן שונה/תא ריק באחד התאים בעמודה סמן את משתנה זכייה ל   
                tempResult = false;
                break;
            }
        }

        if (tempResult) return true; //  אז יש נצחוןTRUE במידה ולולאת בדיקת עמודות בשורה בעמודה סיימה ב

        if (r == c) //במידה ולא היה נצחון בשורות והעמודות, אז מריץ בדיקה האם אני על האלכסון הראשי
        {
            tempResult = true;
            for (let i: number = 0; i < MainBoard.board.length; i++) {
                if (!this.checkCell(char, i, i)) {
                    tempResult = false; // FALSE אם יש סימן שונה או תא ריק באחד התאים באלכסון הראשי - סמן את משתנה הנצחון ב
                    break;
                }
            }

            if (tempResult) return true; //  אז יש נצחוןTRUE במידה ולולאת בדיקת אלכסונים  ב
        }

        if (r + c + 1 == MainBoard.board.length)  // FALSE אם יש סימן שונה או תא ריק באחד התאים באלכסון המשני - סמן את משתנה הנצחון ב
        {
            tempResult = true;
            for (let i: number = 0; i < MainBoard.board.length; i++) {

                if (!this.checkCell(char, i, MainBoard.board.length - i - 1)) {
                    tempResult = false;
                    break;
                }
            }
        }
        return tempResult;
    }

    private checkCell(char: string, r: number, c: number) { //  TRUE בדיקה אם התא מכיל את אותו תו. אם כן, מחזיר
        if (MainBoard.board[r][c] == undefined) return false;
        if (MainBoard.board[r][c] != char) return false;
        return true;
    }
}