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
        var position = undefined;
        while (position == undefined || isNaN(position)) {
            var input = prompt(" " + this.plyrNme + ", please enter your next coordinate:");
            position = parseInt(input);
            if (isNaN(position)) {
                alert("Sorry, input must be a number\nPlease try again.");
            }
            if (position < 0 || position > MainBoard.board.length * MainBoard.board.length - 1) {
                alert("Sorry, input must be a number between zero to eight (0-8)\nPlease try again.");
                position = undefined;
            }
        }
        return MainBoard.GetCoordinates(position);
    };
    return Player;
}());
//# sourceMappingURL=Player.js.map