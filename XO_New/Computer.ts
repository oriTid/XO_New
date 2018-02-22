class Computer extends Player {

    //////////// Methods ////////////////////


    public playerInput(): BoardCoordinates { //מימוש של פונציית האינפוט ע"י דריסה של זו ממחלקתת האבא
        let coordinate = undefined;
        let row: number = 0;
        let col: number = 0;
        let findCount: number; //משתנה שיספור את כמות הסימונים הנדרשת במערך הפנימי על מנת לדעת האם אפשר לשים סימן בשורה

        let gameMap: Array<Array<BoardCoordinates>>; // יצירת מערך למחשב שבו יכניס את הסימנים לכל אחת מהאפשרויות  
        gameMap = new Array(MainBoard.board.length * 2 + 2); //אתחול מערך ריבוי לפי גודל הלוח + שני אלכסונים

        for (let i = 0; i < gameMap.length; i++) {
            gameMap[i] = new Array(MainBoard.board.length);//  אתחול מערכים של רוחב הלוח בתוך המערך של האפשרויות
        }


        for (let i = 0; i < MainBoard.board.length; i++) { //יצירה ואכלוס של הסימנים העדכניים של השורות בלוח לתוך מערך האפשרויות
            for (let x = 0; x < gameMap[i].length; x++) {

                gameMap[i][x] = new BoardCoordinates(row, col); //אתחול כל תא במערך האפשרויות לפי קורדינאטות בסימן העדכני
                if (MainBoard.board[row][col] != undefined)
                    gameMap[i][x].Sign = MainBoard.board[row][col];

                col++;
                if (col > MainBoard.board.length - 1) { // קידום של העמודות עד למקסימום רוחב המערך ואז איפוס עמודה וקידום שורה עד שהכל מלא
                    row++;
                    col = 0;
                }

            }
        }


        row = 0;
        col = 0;
        for (let i = MainBoard.board.length; i < MainBoard.board.length * 2; i++) { //יצירה ואכלוס של הסימנים העדכניים של העמודות בלוח לתוך מערך האפשרויות
            for (let x = 0; x < gameMap[i].length; x++) {

                gameMap[i][x] = new BoardCoordinates(row, col);  //אתחול כל תא במערך האפשרויות לפי קורדינאטות בסימן העדכני
                if (MainBoard.board[row][col] != undefined)
                    gameMap[i][x].Sign = MainBoard.board[row][col];


                row++;
                if (row > MainBoard.board.length - 1) { // קידום של השורות עד למקסימום אורך המערך ואז איפוס שורה וקידום עמודה עד שהכל מלא
                    col++;
                    row = 0;
                }
            }
        }


        row = 0;
        col = 0;
        for (let i = 0; i < gameMap[gameMap.length - 2].length; i++) { //יצירה ואכלוס של הסימנים העדכניים של האלכסון הראשי בלוח לתוך מערך האפשרויות
            gameMap[gameMap.length - 2][i] = new BoardCoordinates(row, col);
            gameMap[gameMap.length - 2][i].Sign = MainBoard.board[row][col];
            row++;
            col++;
        }


        row = 0;
        col = MainBoard.board.length - 1;
        for (let i = 0; i < gameMap[gameMap.length - 1].length; i++) {  //יצירה ואכלוס של הסימנים העדכניים של האלכסון המשני בלוח לתוך מערך האפשרויות
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

            if (findCount == MainBoard.board.length - 1) // מחזיר קורדינטה איפה לסמן את סימן המחשב רק באיטרציה הראשונה בשביל לחסום נצחון של השחקן
                coordinate = this.GetCoordinates(findCount, gameMap, false);

            findCount--;
        }

        if (coordinate == undefined) { //קביעה רנדומלית של הקורדינאטות לסימן של המחשב, כאשר עדיין לא נמצאו קורדינאטות בלולאה שלמעלה
            findCount = 0;
            while (coordinate == undefined) {
                let fndRow: number = this.random(0, gameMap.length); //קבל שורה רנדומלית ממערך האפשרויות של מפת המשחק
                for (let z = 0; z < gameMap[fndRow].length; z++) {
                    if (gameMap[fndRow][z].Sign == undefined) {
                        findCount++;
                        break;
                    }
                }

                if (findCount == MainBoard.board.length || findCount == 1) { //קבל תא רנדומלי מהשורה שנמצאה למעלה שאין בו ערך  ותחזיר את הקורדינאטות שלו
                    let fndCol: number = undefined;
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
    }

    private GetCoordinates(findCount: number, gameMap: Array<Array<BoardCoordinates>>, isComputer: boolean): BoardCoordinates { //
        let goodCount: number = 0; //ספירה של הסימנים שזהים לסימן שהמחשב מחפש לצורך ניצחון או חסימה
        let coordinate = undefined;

        for (let i = 0; i < gameMap.length; i++) { // לולאה שהמחשב מחפש נצחון. מעבר על כל התאים במערך אפשרויות הראשי
            goodCount = 0;
            for (let z = 0; z < gameMap[i].length; z++) { // מעבר על מערך  הפנימי , בכל תא של המערך האפשרויות וחיפוש של הסימן המבוקש 
                if (isComputer) {
                    if (gameMap[i][z].Sign != undefined && gameMap[i][z].Sign == this.plyrSgn) {
                        goodCount++;
                        continue; //אם נמצא הסימן המבוקש של המחשב, תמשיך לאיטרציה הבאה.
                    }
                    else {
                        if (gameMap[i][z].Sign != undefined && gameMap[i][z].Sign != this.plyrSgn) { //אם נמצא סימן של השחקן תאפס וצא מהלולאה
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

            if (goodCount == findCount) { //אם שווים 
                for (let v = 0; v < gameMap[i].length; v++) {
                    if (gameMap[i][v].Sign == undefined) { // חיפוש של המיקום הפנוי לסימון של המחשב או לחסימה או לנצחון
                        coordinate = new BoardCoordinates(gameMap[i][v].Row, gameMap[i][v].Column) //קיבעת הקורדינאטה של המיקום שנמצא
                        break;
                    }
                }
            }

            if (coordinate != undefined) //אם הקודינאטה נמצאה צא מהלולאה
                break;
        }

        return coordinate; //תחזיר קודינאטות 
    }


    private random(min: number, max: number): number { //פונקציית רנדום
        let r: number = (Math.random() * (max - min)) + min;
        return Math.floor(r);
    }

}
