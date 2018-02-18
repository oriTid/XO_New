class Computer extends Player {

        //////////// Methods ////////////////////


    public playerInput(): BoardPosition {
        let coordinate = undefined;
        let row: number = 0;
        let col: number = 0;
        let goodCount: number = 0;
        let sit: Array<Array<BoardPosition>>;
        sit = new Array(MainBoard.board.length * 2 + 2);

        for (let i = 0; i < sit.length; i++) {
            sit[i] = new Array(MainBoard.board.length);
        }


        for (let i = 0; i < MainBoard.board.length; i++) {
            for (let x = 0; x < sit[i].length; x++) {

                sit[i][x] = new BoardPosition(row, col);
                if (MainBoard.board[row][col] != undefined)
                    sit[i][x].Sign = MainBoard.board[row][col];

                col++;
                if (col > MainBoard.board.length - 1) {
                    row++;
                    col = 0;
                }

            }
        }


        row = 0;
        col = 0;
        for (let i = 3; i < MainBoard.board.length * 2; i++) {
            for (let x = 0; x < sit[i].length; x++) {

                sit[i][x] = new BoardPosition(row, col);
                if (MainBoard.board[row][col] != undefined)
                    sit[i][x].Sign = MainBoard.board[row][col];
                

                row++;
                if (row > MainBoard.board.length - 1) {
                    col++;
                    row = 0;
                }
            }
        }


        row = 0;
        col = 0;
        for (let i = 0; i < sit[sit.length - 2].length; i++) {
            sit[sit.length - 2][i] = new BoardPosition(row, col);
            sit[sit.length - 2][i].Sign = MainBoard.board[row][col];
            row++;
            col++;
        }


        row = 0;
        col = MainBoard.board.length - 1;
        for (let i = 0; i < sit[sit.length - 1].length; i++) {
            sit[sit.length - 1][i] = new BoardPosition(row, col);
            sit[sit.length - 1][i].Sign = MainBoard.board[row][col];
            row++;
            col--;
        }


        for (let i = 0; i < sit.length; i++) {
            goodCount = 0;
            for (let z = 0; z < sit[i].length; z++) {
                if (sit[i][z].Sign != undefined && sit[i][z].Sign == this.plyrSgn) {
                    goodCount++;
                    continue;
                }
            }

            if (goodCount == 2) {
                for (var v = 0; v < sit[i].length; v++) {
                    if (sit[i][v].Sign == undefined) {
                        coordinate = new BoardPosition(sit[i][v].Row, sit[i][v].Column)
                        break;
                    }
                }
            }

            if (coordinate != undefined)
                break;
        }

        if (coordinate == undefined) {
            for (let i = 0; i < sit.length; i++) {
                goodCount = 0;
                for (let z = 0; z < sit[i].length; z++) {
                    if (sit[i][z].Sign != undefined && sit[i][z].Sign != this.plyrSgn) {
                        goodCount++;
                        continue;
                    }
                }

                if (goodCount == 2) {
                    for (var v = 0; v < sit[i].length; v++) {
                        if (sit[i][v].Sign == undefined) {
                            coordinate = new BoardPosition(sit[i][v].Row, sit[i][v].Column);
                            break;
                        }
                    }
                }

                if (coordinate != undefined)
                    break;
            }
        }

        if (coordinate == undefined) {
            for (let i = 0; i < sit.length; i++) {
                goodCount = 0;
                for (let z = 0; z < sit[i].length; z++) {
                    if (sit[i][z].Sign != undefined && sit[i][z].Sign != this.plyrSgn) {
                        goodCount++;
                        continue;
                    }
                }

                if (goodCount == 1) {
                    for (let v = 0; v < sit[i].length; v++) {
                        if (sit[i][v].Sign == undefined) 
                            continue;
                        else {
                            if (sit[i][v].Sign != undefined && sit[i][v].Sign != this.plyrSgn)
                                break;
                        }

                        coordinate = new BoardPosition(sit[i][v].Row, sit[i][v].Column);
                    }
                }

                if (coordinate != undefined)
                    break;
            }
        }

        if (coordinate == undefined) {
            for (let i = 0; i < sit.length; i++) {
                goodCount = 0;
                for (let z = 0; z < sit[i].length; z++) {
                    if (sit[i][z].Sign == undefined) {
                        goodCount++;
                        continue;
                    }
                }

                if (goodCount == 3)
                    coordinate = new BoardPosition(sit[i][0].Row, sit[i][0].Column);



                if (coordinate != undefined)
                    break;
            }
        }

       
        return coordinate;
    }

}