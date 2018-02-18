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
        var goodCount = 0;
        var sit;
        sit = new Array(MainBoard.board.length * 2 + 2);
        for (var i = 0; i < sit.length; i++) {
            sit[i] = new Array(MainBoard.board.length);
        }
        for (var i = 0; i < MainBoard.board.length; i++) {
            for (var x = 0; x < sit[i].length; x++) {
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
        for (var i = 3; i < MainBoard.board.length * 2; i++) {
            for (var x = 0; x < sit[i].length; x++) {
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
        for (var i = 0; i < sit[sit.length - 2].length; i++) {
            sit[sit.length - 2][i] = new BoardPosition(row, col);
            sit[sit.length - 2][i].Sign = MainBoard.board[row][col];
            row++;
            col++;
        }
        row = 0;
        col = MainBoard.board.length - 1;
        for (var i = 0; i < sit[sit.length - 1].length; i++) {
            sit[sit.length - 1][i] = new BoardPosition(row, col);
            sit[sit.length - 1][i].Sign = MainBoard.board[row][col];
            row++;
            col--;
        }
        for (var i = 0; i < sit.length; i++) {
            goodCount = 0;
            for (var z = 0; z < sit[i].length; z++) {
                if (sit[i][z].Sign != undefined && sit[i][z].Sign == this.plyrSgn) {
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
        if (coordinate == undefined) {
            for (var i = 0; i < sit.length; i++) {
                goodCount = 0;
                for (var z = 0; z < sit[i].length; z++) {
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
            for (var i = 0; i < sit.length; i++) {
                goodCount = 0;
                for (var z = 0; z < sit[i].length; z++) {
                    if (sit[i][z].Sign != undefined && sit[i][z].Sign != this.plyrSgn) {
                        goodCount++;
                        continue;
                    }
                }
                if (goodCount == 1) {
                    for (var v_1 = 0; v_1 < sit[i].length; v_1++) {
                        if (sit[i][v_1].Sign == undefined)
                            continue;
                        else {
                            if (sit[i][v_1].Sign != undefined && sit[i][v_1].Sign != this.plyrSgn)
                                break;
                        }
                        coordinate = new BoardPosition(sit[i][v_1].Row, sit[i][v_1].Column);
                    }
                }
                if (coordinate != undefined)
                    break;
            }
        }
        if (coordinate == undefined) {
            for (var i = 0; i < sit.length; i++) {
                goodCount = 0;
                for (var z = 0; z < sit[i].length; z++) {
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
    };
    return Computer;
}(Player));
//# sourceMappingURL=Computer.js.map