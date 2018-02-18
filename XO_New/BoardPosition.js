var BoardPosition = /** @class */ (function () {
    function BoardPosition(rowIDX, columnIDX) {
        this.row = rowIDX;
        this.column = columnIDX;
    }
    Object.defineProperty(BoardPosition.prototype, "Row", {
        get: function () {
            return this.row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoardPosition.prototype, "Column", {
        get: function () {
            return this.column;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoardPosition.prototype, "Sign", {
        get: function () {
            return this.sign;
        },
        set: function (x) {
            this.sign = x;
        },
        enumerable: true,
        configurable: true
    });
    return BoardPosition;
}());
//# sourceMappingURL=BoardPosition.js.map