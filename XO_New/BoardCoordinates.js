var BoardCoordinates = /** @class */ (function () {
    function BoardCoordinates(rowIDX, columnIDX) {
        this.row = rowIDX;
        this.column = columnIDX;
    }
    Object.defineProperty(BoardCoordinates.prototype, "Row", {
        get: function () {
            return this.row;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoardCoordinates.prototype, "Column", {
        get: function () {
            return this.column;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BoardCoordinates.prototype, "Sign", {
        get: function () {
            return this.sign;
        },
        set: function (x) {
            this.sign = x;
        },
        enumerable: true,
        configurable: true
    });
    return BoardCoordinates;
}());
//# sourceMappingURL=BoardCoordinates.js.map