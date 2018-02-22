var Player = /** @class */ (function () {
    function Player(PLAYERNAME, PLAYERSIGN) {
        this.playerName = PLAYERNAME;
        this.playerSign = PLAYERSIGN;
    }
    Object.defineProperty(Player.prototype, "plyrNme", {
        get: function () {
            return this.playerName;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Player.prototype, "plyrSgn", {
        get: function () {
            return this.playerSign;
        },
        enumerable: true,
        configurable: true
    });
    //////////// Methods /////////////
    Player.prototype.playerInput = function () {
        var position = undefined; //
        var coordinates;
        while (position == undefined || isNaN(position)) {
            var input = prompt(" " + this.plyrNme + ", please enter your next coordinate:"); //קליטת הפוזיציות מהשחקן
            position = parseInt(input);
            if (isNaN(position)) {
                alert("Sorry, input must be a number\nPlease try again.");
            }
            if (position < 0 || position > MainBoard.board.length * MainBoard.board.length - 1) {
                alert("Sorry, input must be a number between 0 to " + (MainBoard.board.length * MainBoard.board.length - 1) + "\nPlease try again.");
                position = undefined;
            }
            coordinates = MainBoard.GetCoordinates(position);
            if (MainBoard.board[coordinates.Row][coordinates.Column] != undefined) {
                alert("This position is taken by " + MainBoard.board[coordinates.Row][coordinates.Column] + "\nPlease Try Again");
                position = undefined;
            }
        }
        return coordinates; //החזרה של קודינאטות מהפוזיציה
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map